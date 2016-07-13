#!/usr/bin/env python

# Import flask dependencies
from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for
import flask.views

# Import SQLAlchemy libraries
from sqlalchemy import or_
from sqlalchemy import func

# Import the database object from the main app module

# from app import config as config
from modconfig import config as modconfig
from constants import constants as constants

# Import module models (i.e. User)
if modconfig['db'] == 'sqlite':
    from app.mod_bible.models.sqlite import Bible
    from app.mod_bible.models.sqlite import BibleSchema
elif modconfig['db'] == 'mysql':
    from app.mod_bible.models.mysql import Bible
    from app.mod_bible.models.mysql import BibleSchema

# Get some shared methods that the app can use for various things
# like printing json back to the browser
from app import tools
from app import default_methods

# Define the blueprint: 'bible', set its url prefix: app.url/bible
mod_bible = Blueprint('bible', __name__, url_prefix='/bible')

# Make a BibleSchema accessible to all routes
def set_schema(only_columns=None, many=False):
    if only_columns:
        return BibleSchema(only=only_columns, many=many)
    else:
        return BibleSchema(many=many)

@mod_bible.route('/', methods=default_methods)
def root():
    return render_template('mod_bible/main.html'), 200

@mod_bible.route('/readme', methods=default_methods)
def readMe():
    return render_template('mod_bible/readme.html'), 200

@mod_bible.route('/version', methods=default_methods)
def version():
    version_data = {
        'version': constants['version']
    }
    return tools.makeResponse(results=version_data, errors=False, message='API Version Response')

@mod_bible.route('/keyword/<method>/<text>', methods=default_methods)
@mod_bible.route('/keyword/<method>/', methods=default_methods)
@mod_bible.route('/keyword/<method>/<text>/<book>/<chapter>/<verse>', methods=default_methods)
@mod_bible.route('/keyword/<method>/<text>/<book>/<chapter>/', methods=default_methods)
@mod_bible.route('/keyword/<method>/<text>/<book>/', methods=default_methods)
@mod_bible.route('/keyword/<method>/<text>/section/<section>', methods=default_methods)
def keyword(method=None, text=None, book=None, chapter=None, verse=None, section=None):
    bible_schema = set_schema(many=True)
    if text and method:
        if book and chapter and verse:
            data = lookup(book=book, chapter=chapter, verse=verse, return_object=True)
            subquery = True
        elif book and chapter:
            data = lookup(book=book, chapter=chapter, return_object=True)
            subquery = True
        elif book:
            data = lookup(book=book, return_object=True)
            subquery = True
        elif section:
            data = lookup(section=section, return_object=True)
        else:
            data = Bible.query

        if data:
            if method == 'contains':
                data = data.filter(Bible.verse_text.contains(text))
            elif method == 'startswith':
                data = data.filter(Bible.verse_text.startswith(text))
            elif method == 'endswith':
                data = data.filter(Bible.verse_text.endswith(text))
            elif method == 'exact':
                data = data.filter(or_(Bible.verse_text.like("% " + text + " %")
                , Bible.verse_text.like("% " + text + ".%")
                , Bible.verse_text.like("% " + text + ",%")
                , Bible.verse_text.like("% " + text + ";%")
                , Bible.verse_text.like("% " + text + "!%")
                , Bible.verse_text.like("% " + text + "?%")))
            else:
                return tools.makeResponse(results=None, errors=True, message='Incomplete command')

            data.order_by(Bible.id).all()
            results = bible_schema.dump(data)
            return tools.makeResponse(results=results.data, errors=results.errors, message='Verses')
        else:
            return tools.makeResponse(results=None, errors=true, message='No verses matched your query')
    else:
        return tools.makeResponse(results=None, errors=True, message='No verse search method specified (contains, startswith, endswith)')

@mod_bible.route('/lookup/<book>/<chapter>/<verse>', methods=default_methods)
@mod_bible.route('/lookup/<book>/<chapter>/', methods=default_methods)
@mod_bible.route('/lookup/<book>/', methods=default_methods)
@mod_bible.route('/lookup/section/<section>', methods=default_methods)
def lookup(book=None, chapter=None, verse=None, section=None, return_object=False):
    bible_schema = set_schema(many=True)

    if book and chapter and verse:
        verse_data = [x.strip() for x in verse.split(',')]
        verses = []
        for verse_block in verse_data:
            if '-' in verse_block:
                verse_split = verse_block.split('-')
                verse1 = verse_split[0]
                verse2 = verse_split[1]
                verse_range = range(int(verse1), int(verse2)+1)
                verses.extend(verse_range)
            else:
                verses.append(int(verse_block))

        data = Bible.query.filter(or_(Bible.book_id.like(book), Bible.book_abbr.like(book), Bible.book_name.like(book))).filter_by(chapter_id=chapter).filter(Bible.verse_id.in_(verses))
    elif book and chapter:
        data = Bible.query.filter(or_(Bible.book_id.like(book), Bible.book_abbr.like(book), Bible.book_name.like(book))).filter_by(chapter_id=chapter)
    elif book:
        data = Bible.query.filter(or_(Bible.book_id.like(book), Bible.book_abbr.like(book), Bible.book_name.like(book)))
    elif section:
        data = Bible.query.filter(or_(Bible.section.like(section)))

    # results = bible_schema.dump(data)
    if return_object:
        if data:
            return data
        else:
            return None
    else:
        data = data.all()
        results = bible_schema.dump(data)
        if results.data:
            return tools.makeResponse(results=results.data, errors=results.errors, message='Lookup Verse(s)')
        else:
            return tools.makeResponse(results=None, errors=False, message='No verses match your query')

@mod_bible.route('/get_books/', methods=default_methods)
@mod_bible.route('/get_section/', methods=default_methods)
@mod_bible.route('/get_section/<section>', methods=default_methods)
def get_books_and_sections(section=None):
    bible_schema = set_schema(only_columns=('book_id', 'book_abbr', 'book_name', 'section'), many=True)
    data = None
    message = 'Books'
    if section:
        if section == 'OT' or section == 'NT':
            data = Bible.query.with_entities(Bible.book_id, Bible.book_abbr, Bible.book_name, Bible.section).filter_by(section=section).group_by(Bible.book_id).order_by(Bible.book_id).all()
            message += ': ' + section

    if not data:
        data = Bible.query.with_entities(Bible.book_id, Bible.book_abbr, Bible.book_name, Bible.section).group_by(Bible.book_id).order_by(Bible.book_id).all()
        which_rule = tools.getRouteDetails(mod_bible.name, request, 'rule')

        if which_rule == 'get_section/':
            message += ': No section selected, listing all'
        else:
            message += ': All'

    results = bible_schema.dump(data)

    return tools.makeResponse(results=results.data, errors=results.errors, message=message)

@mod_bible.route('/get_book_details/<string>', methods=default_methods)
def get_book_details(string, respond=True):
    only_columns = ('book_id', 'book_abbr', 'book_name', 'section')
    bible_schema = set_schema(only_columns=only_columns, many=False)
    message = 'Book: '
    data = Bible.query.filter(or_(Bible.book_id.like(string), Bible.book_abbr.like(string), Bible.book_name.like(string))).group_by(Bible.book_id).first()
    results = bible_schema.dump(data)

    if results:
        message += results.data['book_name']
        count = 1
    else:
        count = 0

    return tools.makeResponse(results=results.data, errors=results.errors, count=count, message=message,  is_json=respond)

@mod_bible.route('/get_chapters/', methods=default_methods)
@mod_bible.route('/get_chapters/<book>', methods=default_methods)
@mod_bible.route('/get_chapters/<book>/verses', methods=default_methods)
def get_chapters(book=None):
    which_rule = tools.getRouteDetails(mod_bible.name, request, 'rule')
    if book:
        book_data = get_book_details(book, False)
        if book_data['count']:
            book_data['results']['chapters'] = {}
            bible_schema = set_schema(only_columns=('chapter_id', 'chapter_id', 'verse_id'), many=True)
            if which_rule == "get_chapters/<book>/verses":
                data = Bible.query.with_entities(func.count(Bible.verse_id).label('verse_id'), Bible.chapter_id).filter(Bible.book_id==book_data['results']['book_id']).group_by(Bible.chapter_id).all()
                results = bible_schema.dump(data)
                book_data['results']['chapters']['count'] = len(results.data)
                book_data['results']['verses'] = {}
                book_data['results']['verses']['by_chapter'] = results.data

                total_verse_count = 0
                for line in results.data:
                    total_verse_count += int(line['verse_id'])

                book_data['results']['verses']['count'] = total_verse_count
                book_data['message'] += ', with chapter count and details'
            else:
                data = Bible.query.with_entities(Bible.chapter_id).filter(Bible.book_id==book_data['results']['book_id']).group_by(Bible.chapter_id).count()
                book_data['results']['chapters']['count'] = data
                book_data['message'] += ', with chapter count'

        return tools.jsonize(book_data)
    else:
        return tools.makeResponse(results=None, errors=True, message='Incomplete command: ' + which_rule)
