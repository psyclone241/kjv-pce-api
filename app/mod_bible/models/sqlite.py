#!/usr/bin/env pythons
from app.mod_bible.modconfig import config as modconfig
# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db
from app import ma

# Define a base model for other database tables to inherit
class Base(db.Model):
    __abstract__  = True

# Define a Bible model
class Bible(Base):
    __bind_key__ = modconfig['bind_key']
    __tablename__ = 'Bible'

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer,  nullable=False)
    book_abbr = db.Column(db.String(4), nullable=False)
    book_name = db.Column(db.String(15), nullable=False)
    section = db.Column(db.String(2), nullable=False)
    chapter_id = db.Column(db.Integer,  nullable=False)
    verse_id = db.Column(db.Integer,  nullable=False)
    verse_text = db.Column(db.Text,  nullable=False)

    # New instance instantiation procedure
    def __init__(self, id=None, book_id=None, book_abbr=None, book_name=None
        ,section=None, chapter_id=None, verse_id=None, verse_text=None):

        self.id = id
        self.book_id = book_id
        self.book_abbr = book_abbr
        self.book_name = book_name
        self.section = section
        self.chapter_id = chapter_id
        self.verse_id = verse_id
        self.verse_text = verse_text

    # def __repr__(self):

class BibleSchema(ma.Schema):
    class Meta():
        model = Bible
        fields = ('id', 'book_id', 'book_abbr', 'book_name', 'section', 'chapter_id', 'verse_id', 'verse_text')
