import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для получения городских событий с фильтрацией по категориям'''
    
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
            
            if category:
                cursor.execute('''
                    SELECT id, title, description, category, date, time, 
                           location, location_address, price, tickets_available
                    FROM events 
                    WHERE category = %s
                    ORDER BY date ASC, time ASC
                ''', (category,))
            else:
                cursor.execute('''
                    SELECT id, title, description, category, date, time, 
                           location, location_address, price, tickets_available
                    FROM events 
                    ORDER BY date ASC, time ASC
                ''')
            
            rows = cursor.fetchall()
            events_list = []
            
            for row in rows:
                events_list.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'category': row[3],
                    'date': row[4].isoformat() if row[4] else None,
                    'time': row[5].strftime('%H:%M') if row[5] else None,
                    'location': row[6],
                    'locationAddress': row[7],
                    'price': float(row[8]) if row[8] else 0,
                    'ticketsAvailable': row[9]
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'events': events_list,
                    'total': len(events_list)
                }, ensure_ascii=False),
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
