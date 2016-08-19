# kjv-pce-api

## King James Version PCE API for Public Consumption

### Old Versions
* For the original PHP api, checkout the branch named '[minimal-php](https://github.com/psyclone241/kjv-pce-api/tree/minimal-php)'

### Active Sample
* [KJV.byfaith.net](http://kjv.byfaith.net)

### Data
* The SQLite Database was made available from http://www.bibleprotector.com/KJV-PCE.db
* The SQLite Database at data/kjv-pce-v2.db has column name modifications from the original
* The MySQL Database Dump was built from the above SQLite Database

### Setup
* Refer to [INSTALL.md](INSTALL.md) for installation and setup instructions

### TODO List
* Add Strongs and some detailed concordance texts
* Add more/thorough testing to the run_tests.py suite

### Usage
* Run the service
  * `make serve`
* All following commands are prefaced with http://your_host_name:your_port
* Use web interface, go to http://your_host_name:your_port/bible/
* Get Sections (NT/OT)
  * List All Books in the OT
    * /bible/get_section/OT
  * List All Books in the NT
    * /bible/get_section/NT
* Get Book Information
  * List of Books
    * /bible/get_section/
  * List of Books
    * /bible/get_books/
  * List of Chapters in a Book
    * /bible/get_chapters/1
  * List of Verses in a Book & Chapter
    * /bible/get_chapters/1/verses
* Lookup Verses
  * List Complete Book
    * /bible/lookup/1
  * List Complete Chapter
    * /bible/lookup/1/1
  * List Single Verse
    * /bible/lookup/1/1/1
  * List Range of Verses
    * /bible/lookup/1/1/1-5
  * List Specific Group of Verses
    * /bible/lookup/1/1/1,3,5
* Keyword Searches (can be narrowed down by book, chapter, and verses, same format as lookup, just add /book/chapter/verse)
  * Search for Specific Keyword is Contained in Text
    * /bible/keyword/contains/word
  * Search for Specific Keyword Where Text Starts With Text
    * /bible/keyword/startswith/word
  * Search for Specific Keyword Where Text Ends With Text
    * /bible/keyword/endswith/word
  * Search for Specific Keyword Where Text is an Exact Match in Text
    * /bible/keyword/exact/word

### Testing
* Run the flask apps test suite
  * `make testflask` or
  * `python run_python_tests.py`
* TODO: Build Angular application test suite with Karma
