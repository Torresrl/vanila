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
            ''' 
            Service worker needs to be in root file, beacuse it only works for the files it is defined in.
            If we had service worker in public, it would only work for calls to: https://www.domain/public
            '''
            if split_path[0] == '/serviceworker' and extension == '.js':
                self.contents = open(file_path.split('/')[1])
            elif extension in (".jpg", ".jpeg", ".png"):
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
