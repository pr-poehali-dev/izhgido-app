import json
import os
import psycopg2
from decimal import Decimal

def handler(event: dict, context) -> dict:
    '''API для получения городских локаций и районов'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        try:
            dsn = os.environ.get('DATABASE_URL')
            conn = psycopg2.connect(dsn)
            cursor = conn.cursor()
            
            query_params = event.get('queryStringParameters') or {}
            category = query_params.get('category')
            district = query_params.get('district')
            
            query = '''
                SELECT id, name, category, address, district, phone, 
                       working_hours, description, icon
                FROM locations 
                WHERE 1=1
            '''
            params = []
            
            if category:
                query += ' AND category = %s'
                params.append(category)
            
            if district:
                query += ' AND district = %s'
                params.append(district)
            
            query += ' ORDER BY name ASC'
            
            cursor.execute(query, params if params else None)
            rows = cursor.fetchall()
            locations_list = []
            
            for row in rows:
                locations_list.append({
                    'id': row[0],
                    'name': row[1],
                    'category': row[2],
                    'address': row[3],
                    'district': row[4],
                    'phone': row[5],
                    'workingHours': row[6],
                    'description': row[7],
                    'icon': row[8]
                })
            
            cursor.execute('SELECT id, name, population, area_km2, color FROM districts ORDER BY name')
            district_rows = cursor.fetchall()
            districts_list = []
            
            for row in district_rows:
                districts_list.append({
                    'id': row[0],
                    'name': row[1],
                    'population': f"{row[2] // 1000} тыс." if row[2] else None,
                    'area': float(row[3]) if row[3] else None,
                    'color': row[4]
                })
            
            cursor.close()
            conn.close()
            
            def decimal_default(obj):
                if isinstance(obj, Decimal):
                    return float(obj)
                raise TypeError
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'locations': locations_list,
                    'districts': districts_list,
                    'total': len(locations_list)
                }, ensure_ascii=False, default=decimal_default),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}, ensure_ascii=False),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False),
        'isBase64Encoded': False
    }