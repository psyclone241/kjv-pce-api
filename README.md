# kjv-pce-api

## King James Version PCE API for Public Consumption

### Data
* The SQLite Database was made available from http://www.bibleprotector.com/KJV-PCE.db
* The SQLite Database at data/kjv-pce-v2.db has column name modifications from the original
* The MySQL Database Dump was built from the above SQLite Database

### Setup
* Refer to [INSTALL.md](INSTALL.md) for installation and setup instructions

### TODO List
* Write documentation for install on Apache.  As it is, there is a document on DigitalOcean
that I followed and it worked well [Deploy Flask to Apache](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-flask-application-on-an-ubuntu-vps).
  * You must acquire and enable the apache mod wsgi
    * `sudo apt-get install libapache2-mod-wsgi python-dev`
    * `sudo a2enmod wsgi`
  * You must pip install all the modules listed in [setup.sh](setup.sh)
  * You must create and enable an apache conf file for your site to enable wsgi
  * Modify the flaskapp.wsgi file to show your installed /var/www/directory

### Usage
* Run the service
  * `make serve`
* All following commands are prefaced with http://your_host_name:your_port
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
