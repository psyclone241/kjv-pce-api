#!/usr/bin/env pythons
from app.mod_bible.modconfig import config as modconfig
# Import the database object (db) from the main application module
# We will define this inside /app/__init__.py in the next sections.
from app import db
from app import ma
# from flask import jsonify
from sqlalchemy.dialects.mysql import \
        BIGINT, BINARY, BIT, BLOB, BOOLEAN, CHAR, DATE, \
        DATETIME, DECIMAL, DECIMAL, DOUBLE, ENUM, FLOAT, INTEGER, \
        LONGBLOB, LONGTEXT, MEDIUMBLOB, MEDIUMINT, MEDIUMTEXT, NCHAR, \
        NUMERIC, NVARCHAR, REAL, SET, SMALLINT, TEXT, TIME, TIMESTAMP, \
        TINYBLOB, TINYINT, TINYTEXT, VARBINARY, VARCHAR, YEAR

# Define a base model for other database tables to inherit
class Base(db.Model):
    __abstract__  = True

# Define a Bible model
class Bible(Base):
    __bind_key__ = modconfig['bind_key']
    __tablename__ = 'Bible'

    id = db.Column(SMALLINT(5), primary_key=True)
    book_id = db.Column(SMALLINT(2),  nullable=False)
    book_abbr = db.Column(VARCHAR(4), nullable=False)
    book_name = db.Column(VARCHAR(15), nullable=False)
    section = db.Column(VARCHAR(2), nullable=False)
    chapter_id = db.Column(TINYINT(3),  nullable=False)
    verse_id = db.Column(TINYINT(3),  nullable=False)
    verse_text = db.Column(TEXT,  nullable=False)

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
