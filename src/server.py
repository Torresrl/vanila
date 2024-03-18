import os
import json

from http.server import BaseHTTPRequestHandler
from routes.main import routes

from response.staticHandler import StaticHandler
from response.templateHandler import TemplateHandler
from response.badRequestHandler import BadRequestHandler

class Server(BaseHTTPRequestHandler):
    def do_HEAD(self):
        return

    def do_POST(self):
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)

        response_data = {'message': 'Hei fra server'}

        json_data = json.dumps(response_data)

        print(content_len)
        print(post_body)
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json_data.encode('utf-8'))


    def do_GET(self):
        split_path = os.path.splitext(self.path)
        request_extension = split_path[1]

        if request_extension == '' or request_extension == '.html':
            if self.path in routes:
                handler = TemplateHandler()
                handler.find(routes[self.path])
            else:
                handler = BadRequestHandler()
        elif request_extension == '.py':
            handler = BadRequestHandler()
        else:
            handler = StaticHandler()
            handler.find(self.path)

        self.respond({'handler': handler})

    def handle_http(self, handler):
        status_code = handler.getStatus()

        self.send_response(status_code)

        if status_code == 200:
            content = handler.getContents()
            self.send_header('Content-type', handler.getContentType())
        else:
            content = '404 Not Found'

        self.end_headers()

        if isinstance(content, (bytes, bytearray)):
            return content

        return bytes(content, 'UTF-8')

    def respond(self, opts):
        content = self.handle_http(opts['handler'])
        self.wfile.write(content)