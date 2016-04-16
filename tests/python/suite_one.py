#!!/usr/bin/env python
import os
import sys
import unittest

config_path = os.path.join('..','..')
app_path = os.path.join('..', '..', 'app')

sys.path.append(config_path)
import config

sys.path.append(app_path)
from app import app, db
from app.mod_bible.models.sqlite import Bible
from app.mod_bible.models.sqlite import BibleSchema

class TestCase(unittest.TestCase):
    def setUp(self):
        # TODO: Build up testing to more detailed
        # print(config['BASEDIR'])
        # app.config['TESTING'] = True
        # app.config['WTF_CSRF_ENABLED'] = False
        # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.config['BASEDIR'], '/test/test.db')
        self.app = app.test_client()
        # db.create_all()

    def tearDown(self):
        db.session.remove()
        # db.drop_all()

    def test_app_root(self):
        return self.app.post('/', data=dict(), follow_redirects=False)

    def test_bible_root(self):
        return self.app.post('/bible/', data=dict(), follow_redirects=False)

    def test_bible_lookup(self):
        return self.app.post('/bible/lookup/Genesis/1/1', data=dict(), follow_redirects=False)

    def test_bible_keyword(self):
        return self.app.post('/bible/keyword/exact/God', data=dict(), follow_redirects=False)

    def test_bible_get_section(self):
        return self.app.post('/bible/get_section/NT', data=dict(), follow_redirects=False)

    def test_bible_get_chapters(self):
        return self.app.post('/bible/get_chapters/Psalms/full', data=dict(), follow_redirects=False)

if __name__ == '__main__':
    unittest.main()
