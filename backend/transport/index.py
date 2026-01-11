import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для получения информации о транспорте в реальном времени'''
    
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
            
            cursor.execute('''
                SELECT 
                    tr.id, tr.route_number, tr.route_name, tr.transport_type, 
                    tr.color, tl.arrival_time, tl.status, tl.current_location, 
                    tl.next_stop, tl.last_updated
                FROM transport_routes tr
                LEFT JOIN transport_live tl ON tr.id = tl.route_id
                WHERE tr.status = 'active'
                ORDER BY tl.arrival_time ASC
            ''')
            
            rows = cursor.fetchall()
            transport_list = []
            
            for row in rows:
                transport_list.append({
                    'id': row[0],
                    'route': row[1],
                    'name': row[2],
                    'type': row[3],
                    'color': row[4],
                    'time': f"{row[5]} мин" if row[5] else 'Н/Д',
                    'status': row[6] or 'Неизвестно',
                    'currentLocation': row[7],
                    'nextStop': row[8],
                    'lastUpdated': row[9].isoformat() if row[9] else None
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
                    'transport': transport_list,
                    'total': len(transport_list),
                    'timestamp': datetime.now().isoformat()
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
