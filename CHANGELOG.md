[0.1.0] - September 15, 2014
 * Initial Version Tagged, 108 commits included

[0.1.1] - September 16, 2014
 * Added v2 of the API, using a cusom modified version of the DB file from bibleprotector. This custom version includes a primary key field, integer types on all number valued fields. It also includes 3 custom views based on a new field called section, which is either NT or OT for the Testaments. (Roy Keyes)
 * Uploading CHANGELOG (Roy Keyes)

[0.1.2] - February 8, 2015
 * Fixing the locations of the libraries in the main index.php file. (Roy Keyes)
 * Removing the old v2,v3,etc.. directories. Moving the files to the api directory. (Roy Keyes)
 * Moved the columns data in the result set to the top with the other base values. (Roy Keyes)
 * Edited the README to include new parameters available (output, get_file). (Roy Keyes)
 * Removing version 2 from active code updates. (Roy Keyes)
 * Adding version 3. Version 3 now has multiple export formats, json, csv, and xml. It will also return sections in the get_books query. A few other minor bug fixes. (Roy Keyes)
 * Removing version 1, the test project is now all combined in v2 (Roy Keyes)
 * Adding a functions library and a script to collect all the GET vars. (Roy Keyes)
 * Adjusting layout to support versions with different settings files. Also added an INSTALL file (needs to be completed) (Roy Keyes)
 * Adding <?php script tags to all php files.  Designating the api_keys array as array(.  Apparently both of these are handled properly by my test host, but not my local host. (Roy Keyes)
 * Fixing missing section variable passed to the get_books method (Roy Keyes)

[0.1.3] - February 8, 2015
 * Fixed a small bug in the xml output. (Roy Keyes)

[0.1.4] - February 8, 2015
 * Fixing spacing in the output section. Adding new tag with latest release of bug fixes in the XML output. (Roy Keyes)
 * Fixing the column names in the json, xml output to be consistently uppercase. (Roy Keyes)

[0.1.5] - April 16, 2016
 * Saving files to repository (Roy Keyes)
 * Saving files to repository (Roy Keyes)
 * Saving changes in case of crash (Roy Keyes)
 * Partial work on making a direct link to passages (Roy Keyes)
 * Update the main view for mod_bible (Roy Keyes)
 * Another full refactor of the makefile and makefile scripts used for configuration & setup. Update the documentation to match the makefile options available (Roy Keyes)
 * Add link to Bible module from the root site (Roy Keyes)
 * Another refactor of the setup scripts, updating documentation, and moving the bower install (Roy Keyes)
 * Complete re-structure for better configurability (Roy Keyes)
 * Remove flaskapp.wsgi from committed files and include new example for same (Roy Keyes)
 * New lookup section along with upgraded mobile styling (Roy Keyes)
 * Update bower.json in static/resources to include new angular libs (Roy Keyes)
 * Fix the setup script (Roy Keyes)
 * Update the setup script to allow skipping virtualenv and installing the bower_components (Roy Keyes)
 * Deleting the old gitignore for the coming release of the python-flask version (Roy Keyes)
 * Update python-flask README to show link to old php version (Roy Keyes)
 * Deleting the old gitignore for the coming release of the python-flask version (Roy Keyes)
 * Add script tag for config.js in mod_bible layout.html (Roy Keyes)
 * Use config.api_url in mod_bible app.js (Roy Keyes)
 * Add config.example.js for mod_bible (Roy Keyes)
 * Update gitignore for new config.js (Roy Keyes)
 * Build out the new web application templates and angular application (Roy Keyes)
 * Update configuration file example (Roy Keyes)
 * Update mod_bible controller to use flask.views and add additional data to the get_chapters/1/verses method (Roy Keyes)
 * Rearrange routing and add flask.views in the main application (Roy Keyes)
 * Remove old data storage location for mod_bible (Roy Keyes)
 * Move the data storage for the mod_bible to data/mod_bible (Roy Keyes)
 * Update gitignore for all files not necessary in the repository (Roy Keyes)
 * Update INSTALL.md to include instructions for mysql-python (Roy Keyes)
 * Remove app.db file accidentally pushed (Roy Keyes)
 * Add first set of tests in the test suite and documentation for same (Roy Keyes)
 * Add handler for 500 error (Roy Keyes)
 * Update documentation and install script details for apache setup (Roy Keyes)
 * Edit app/__init__ to have a run method for apache to load (Roy Keyes)
 * Add flaskapp.wsgi file for apache installs (Roy Keyes)
 * Update README for Apache installation details, add instruction for editing flaskapp.wsgi file (Roy Keyes)
 * Update README for Apache installation details (Roy Keyes)
 * Update README, add links to php and python branches (Roy Keyes)
 * Update gitignore (Roy Keyes)
 * Update README, add link to INSTALL.md (Roy Keyes)
 * Update README to show make serve command (Roy Keyes)
 * Update README and INSTALL and add auto setup scripts (Roy Keyes)
 * Remove old php api settings example (Roy Keyes)
 * Update master branch to just show the new branches (Roy Keyes)
 * Update gitignore (Roy Keyes)
 * Update README (Roy Keyes)
 * First upload of new version (Roy Keyes)
 * Move all old php features and documents to ol_version (Roy Keyes)
 * Wow, I'm half asleep today, another attempt to fix the link (Roy Keyes)
 * Update README link to original README, fixing the link (Roy Keyes)
 * Update README link to original README (Roy Keyes)
 * Update README to show new construction work going into this repository (Roy Keyes)

 [0.1.6] - April 16, 2016
 * Fix root module app.js and adjust layouts for initial screens on mod_bible (Roy Keyes)
 * Update config.example.json for mod_bible (Roy Keyes)
 * Update gitignore and add flaskapp.example.wsgi (Roy Keyes)

[0.1.7] - April 16, 2016
 * Fix link from main module to mod_bible module (Roy Keyes)

[0.1.8] - April 21, 2016
 * Load the new mlt.filters module and its children (Roy Keyes)
 * Update mod_bible to fully integrate the search module of the api and display it to the interface (Roy Keyes)
 * Add mlt.filters custom filters for general use (Roy Keyes)
 * Saving changes to repository (Roy Keyes)
 * Making changes to the structure to use more modules (Roy Keyes)
 * Update README to include link to live site (Roy Keyes)

[0.1.9] - April 21, 2016
 * Fix missing modconfig py and example file, add these to the copyconfigs script (Roy Keyes)

[0.1.10] - April 24, 2016
 * Add new search bar to directly access reference lookup (Roy Keyes)
 * Saving latest working changes, which includes search and automatic lookup of references (Roy Keyes)
 * Updates to the search modal and fix for book list search (Roy Keyes)

[0.1.11] - July 12, 2016
 * Add import_string library to parse module config for loading plugins (Roy Keyes)
 * Add line for loading plugins in the config example (Roy Keyes)
 * Fix reference to make servelocal back to make serve in the makefile itself (Roy Keyes)
 * Fix reference to make servelocal back to make serve (Roy Keyes)
 * Update README and makefile (Roy Keyes)
 * Fixing redirect in anchorScroll rootscope method (Roy Keyes)

[0.1.12] - July 12, 2016
 * Add ability for databases to be configured for different modules from an sql_binds array (Roy Keyes)

[0.1.13] - July 12, 2016
 * Update constants for mod_bible to new version (Roy Keyes)
 * Add constants file to load version number and future constant vars (Roy Keyes)

[0.1.14] - August 17, 2016
 * Remove flaskapp.wsgi from the repo (Roy Keyes)
 * Update installation documenation for loadbower and copyconfig (Roy Keyes)
 * Add preconfigured apache configuration file for example (Roy Keyes)