kjv-pce-api
=====================================================================================
King James Version PCE API for Public Consumption

Usage
=====================================================================================
--Lists of Specific Groups--
List All Books in the OT: ?get_section=OT
List All Books in the NT: ?get_section=NT
List of Books: ?get_books=1
List of Chapters in a Book: ?get_chapters&book=1
List of Chapters in a Book with All Verse Data: ?get_chapters&book=1&include_data=1
List of Verses in a Book & Chapter: ?get_verses&book=1&chapter=1

--Lists of Specific Categories--
List Complete Section: ?section=OT or ?section=NT
List Complete Book: ?book=1
List Complete Chapter: ?book=1&chapter=1
List Single Verse: ?book=1&chapter=1&verses=1
List Range of Verses: ?book=1&chapter=1&verses=1-5
List Specific Group of Verses: ?book=1&chapter=1&verses=1,3,5

--All searches can be narrowed down by book, chapter, and verses--
Search for Specific Keyword is Contained in Text: ?keyword=keyword&match=contains
Search for Specific Keyword Where Text Starts With Text: ?keyword=keyword&match=startswith
Search for Specific Keyword Where Text Ends With Text: ?keyword=keyword&match=endswith
Search for Specific Keyword Where Text is an Exact Match in Text: ?keyword=keyword&match=exact

Parameters          Possible Values
=====================================================================================
section             str('OT') or str('NT') -> Used individually or in conjunction with keyword, book, chapter, verses
book                int(BookID), str(BookName), str(BookAbr) -> Used individually or in conjunction with keyword, section, chapter, verses
chapter             int(Chapter) -> Used individually or in conjunction with keyword, section, book, verses
verse or verses     int(x), int(x)-int(y), int(a),int(c), int(d) -> Used individually or in conjunction with keyword, section, book, chapter

keyword             str('string') -> Requires (match), used in conjunction with section, book, chapter, and/or verses
match               str('contains'), str('startswith'), str('endswith'), str('exact') -> Used in conjunction with keyword

get_section         str('OT') or str('NT')
get_books           boolean -> Requires (book)
get_chapters        boolean -> Requires (book, chapter)
get_verses          boolean -> Requires (book, chapter, verses)
include_data        boolean -> Used in conjunction with get_* parameters
