import os
import json
import base64
from urllib.request import Request, urlopen
from urllib.error import HTTPError

GEMINI_KEY = os.environ.get('GEMINI_API_KEY', '')

def main(request):
    if request.method == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}
    
    if request.method != 'POST':
        return {'statusCode': 405, 'body': json.dumps({'error': 'Method not allowed'})}
    
    try:
        body = json.loads(request.body or '{}')
    except:
        return {'statusCode': 400, 'body': json.dumps({'error': 'Invalid JSON'})}
    
    image = body.get('image', '')
    if not image:
        return {'statusCode': 400, 'body': json.dumps({'error': 'No image provided'})}
    
    key = GEMINI_KEY
    if not key:
        return {'statusCode': 200, 'body': json.dumps({'error': 'GEMINI_API_KEY not set'})}
    
    try:
        req_body = json.dumps({
            'contents': [{'parts': [
                {'text': 'Return JSON: {"meal":"name","calories":N,"protein":N,"carbs":N,"fats":N,"fiber":N}. Whole portion.'},
                {'inlineData': {'mimeType': 'image/jpeg', 'data': image}}
            ]}],
            'generationConfig': {'responseMimeType': 'application/json'},
        }).encode()
        
        req = Request(
            f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={key}',
            data=req_body,
            headers={'Content-Type': 'application/json'},
            method='POST'
        )
        
        with urlopen(req, timeout=25) as resp:
            raw = resp.read().decode()
        
        data = json.loads(raw)
        text = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', '')
        
        if not text:
            return {'statusCode': 200, 'body': json.dumps({'error': 'EMPTY_RESPONSE'})}
        
        json_data = None
        try:
            json_data = json.loads(text)
        except:
            s = text.indexOf('{') if '{' in text else -1
            e = text.rindex('}') if '}' in text else -1
            if s != -1 and e != -1:
                try:
                    json_data = json.loads(text[s:e+1])
                except:
                    pass
        
        if not json_data:
            return {'statusCode': 200, 'body': json.dumps({'error': 'PARSE_FAILED', 'text': text[:100]})}
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'meal': str(json_data.get('meal', 'Food')),
                'calories': int(json_data.get('calories') or 0),
                'protein': int(json_data.get('protein') or 0),
                'carbs': int(json_data.get('carbs') or 0),
                'fats': int(json_data.get('fats') or 0),
                'fiber': int(json_data.get('fiber') or 0),
            })
        }
    except HTTPError as e:
        raw = e.read().decode() if e.fp else ''
        return {'statusCode': 200, 'body': json.dumps({'error': f'HTTP_{e.code}', 'raw': raw[:200]})}
    except Exception as ex:
        return {'statusCode': 200, 'body': json.dumps({'error': str(ex)})}
