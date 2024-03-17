import os

from response.requestHandler import RequestHandler


class StaticHandler(RequestHandler):

    def __init__(self):
        self.filetypes = {
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.jpg': 'image/jpeg',
            '.png': 'image/png',
            'notFound': 'text/plain'
        }

    def find(self, file_path):
        split_path = os.path.splitext(file_path)
        extension = split_path[1]
        '''
        Her er det sikkerhets risiko, vi kan få tilgang til alle filer med f.eks
        hund.jpg../response/xxx
        '''
        try:
            if extension in (".jpg", ".jpeg", ".png"):
                self.contents = open('public{}'.format(file_path), 'rb')
            else:
                self.contents = open('public{}'.format(file_path), 'r')

            self.setContentType(extension)
            self.setStatus(200)

            return True
        except:
            self.setContentType('notFound')
            self.setStatus(404)

            return False

    def setContentType(self, ext):
        self.contentType = self.filetypes[ext]
