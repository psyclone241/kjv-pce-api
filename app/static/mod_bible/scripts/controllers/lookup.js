angular.module('KJVPCE-Bible')
.controller('LookupController',
function($scope, $route, $uibModal, $routeParams, HTTPService, LogService, $anchorScroll, $location) {
  var object_name = $route.current.controller;
  LogService.logEntry(object_name, 'start', 'Initialize controller');

  $scope.config.screen_name = object_name;
  $scope.config.body.navbar_collapsed = true;
  $scope.config.body.expand_disabled = false;
  $scope.config.body.style = {
    // "padding-top": "100px"
    "padding-top": "50px"
  };
  $scope.config.navbar.style = {
    "background-color": "#CECECE",
    "height": "55px"
  };

  var data_url = $scope.config.restUrl;
  // $anchorScroll.yOffset = 120;
  $anchorScroll.yOffset = 80;
  $scope.column_width = '40%';

  $scope.setPage = function(page_number) {
    $scope.current_page = page_number;
  };

  $scope.verse_menu_options = [
      ['Make a note', function ($itemScope, $event, verse_id) {
          console.log('Make a note at: ' + verse_id);
      }],
      null,
      ['Bookmark', function ($itemScope, $event, verse_id) {
          console.log('Bookmark: ' + verse_id);
      }],
      null,
      ['Highlight', function ($itemScope, $event, verse_id) {
          console.log('Highlight: ' + verse_id);
      }],
  ];

  $scope.getBooks = function() {
    var return_value = HTTPService.get(data_url + 'get_books/').then(function (data) {
      $scope.data.books = data.results;
      return true;
    });
    return return_value;
  };

  $scope.findBook = function(book_value) {
    var book_value = book_value.toLowerCase().trim();
    if(book_value) {
      console.log('Lookup up book: ' + book_value);
      var matched_book = null;
      angular.forEach($scope.data.books, function(value, key) {
        if((value.book_abbr.toLowerCase()==book_value) || (value.book_name.toLowerCase()==book_value) || (value.book_id==book_value)) {
          matched_book = value;
        }
      });

      if(matched_book) {
        LogService.logEntry(object_name, 'match', 'Matching Book Found', matched_book);
        return matched_book;
      } else {
        LogService.logEntry(object_name, 'fail', 'No Matching Book Found');
        return null;
      }
    }
  };

  $scope.selectBook = function(book) {
    $scope.data.selected_book = book;
    $scope.data.select_another_book = false;
    $scope.data.book_query.book_name = null;
    if($scope.data.selected_book) {
      LogService.logEntry(object_name, 'run', 'Getting Chapters');
      HTTPService.get(data_url + 'get_chapters/' + $scope.data.selected_book.book_id + '/verses').then(function (data) {
        $scope.data.selected_book = data.results;
        var chapter_range = []
        var chapter_max = data.results.chapters.count;
        for(var i=1; i<=chapter_max; i++) {
          chapter_range.push(i);
        }
        $scope.data.chapter_range = chapter_range;
      });
    } else {
      LogService.logEntry(object_name, 'fail', 'No Book Selected');
    }
  };

  $scope.sectionFilter = function(element) {
    if($scope.data.book_query.section != 'both') {
      return_value = element.section==$scope.data.book_query.section;
    } else {
      return_value = true;
    }
    return return_value;
  };

  $scope.bookFilter = function(element) {
    if($scope.data.book_query.book_name) {
      return_value = element.book_name.toLowerCase().indexOf($scope.data.book_query.book_name.toLowerCase()) > -1;
    } else {
      return_value = true;
    }
    return return_value;
  };

  $scope.openChapter = function(chapter_id) {
    var selected_chapter = null;
    if($scope.data.selected_book) {
      if($scope.data.selected_book.verses) {
        if($scope.data.selected_book.verses.by_chapter) {
          angular.forEach($scope.data.selected_book.verses.by_chapter, function(value, key) {
            if(value.chapter_id == chapter_id) {
              selected_chapter = value;
            }
          });

          if(selected_chapter) {
            $scope.unsetChapter();
            $scope.data.selected_book.selected_chapter = selected_chapter;
            $scope.data.select_another_chapter = false;
            var verse_range = []
            var verse_max = selected_chapter.verse_id;
            for(var i=1; i<=verse_max; i++) {
              verse_range.push(i);
            }
            $scope.data.verse_range = verse_range;
          }
        }
      }
    }
  };

  $scope.openVerse = function(verse_id) {
    var scroll_to_verse = false;
    var verse_query = '';
    if(typeof(verse_id) == 'number') {
      scroll_to_verse = true;
    } else {
      var first_verse = verse_id[0];
      verse_query = '/' + verse_id.join(',');
    }

    if($scope.data.selected_book) {
      if($scope.data.selected_book.selected_chapter) {
        HTTPService.get(data_url + 'lookup/' + $scope.data.selected_book.book_id + '/' + $scope.data.selected_book.selected_chapter.chapter_id + verse_query).then(function (data) {
          $scope.data.selected_book.text = data.results;
          if(scroll_to_verse) {
            $scope.scrollToVerse(verse_id);
          } else {
            $scope.scrollToVerse(first_verse);
          }
        });
      }
    }
  }

  $scope.scrollToVerse = function(verse_id) {
    $scope.data.selected_book.selected_verse = verse_id;
    $scope.data.select_another_verse = false;
    $scope.setAnchorScroll('lookup', 'anchor_verse_' + verse_id);
  }

  $scope.unsetBook = function() {
    $scope.data.selected_book = null;
    $scope.unsetChapter();
    $scope.unsetVerse();
  }

  $scope.unsetChapter = function() {
    if($scope.data.selected_book) {
      $scope.data.selected_book.selected_chapter = null;
    }
    $scope.unsetVerse();
  }

  $scope.unsetVerse = function() {
    if($scope.data.selected_book) {
      $scope.data.selected_book.selected_verse = null;
    }
  }

  $scope.setSearchParameter = function(value) {
    $scope.data.search_parameters.limit_to.data = value;
  }

  $scope.search = function() {
    LogService.logEntry(object_name, 'search', 'Searching', $scope.data.search_parameters);
    $scope.data.search_results.current_page = 1;
    $scope.data.search_parameters.active = true;
    $scope.data.search_parameters.keywords.set = true;

    if($scope.data.search_parameters.keywords.match=='endswith') {
      var last_character = $scope.data.search_parameters.keywords.data.slice(-1);
      if(last_character != '.') {
        $scope.data.search_parameters.keywords.data += '.';
      }
    }

    var limit_to = '';
    if($scope.data.search_parameters.limit_to) {
      limit_to = $scope.data.search_parameters.limit_to;
      if(limit_to == 'section') {
        limit_to = '/section/' + $scope.data.selected_book.section;
      } else if(limit_to == 'book') {
        limit_to = '/' + $scope.data.selected_book.book_id;
      } else if(limit_to == 'chapter') {
        limit_to = '/' + $scope.data.selected_book.book_id + '/' + $scope.data.selected_book.selected_chapter.chapter_id;
      } else {
        limit_to = '';
      }
    }

    // + $scope.data.selected_book.book_id + '/' + $scope.data.selected_book.selected_chapter.chapter_id
    HTTPService.get(data_url + 'keyword/' + $scope.data.search_parameters.keywords.match + '/' + $scope.data.search_parameters.keywords.data + limit_to).then(function (data) {
      $scope.data.search_results.data = data;
      if(data.count > 0) {
        $scope.data.search_parameters.hide_panel = true;
      }
    });
  }

  $scope.hideSearch = function() {
    if($scope.data.search_parameters.hide_panel) {
      $scope.data.search_parameters.hide_panel = false;
    } else {
      $scope.data.search_parameters.hide_panel = true;
    }
  }

  $scope.clearSearch = function(close) {
    $scope.data.search_parameters.active = false;
    $scope.data.search_parameters.hide_panel = false;
    angular.forEach($scope.data.search_parameters, function(value, key) {
      if(key != 'active') {
        value.data = null;
        value.set = false;
      }
    });

    if(close) {
      $scope.data.search_mode = false;
      if($scope.data.selected_book) {
        if($scope.data.selected_book.selected_verse) {
          $scope.setAnchorScroll('lookup', 'anchor_verse_' + $scope.data.selected_book.selected_verse);
        } else {
          console.log('chapter block');
          $scope.setAnchorScroll('lookup', 'chapter_block');
        }
      } else {
        console.log('book block');
        $scope.setAnchorScroll('lookup', 'book_block');
      }
    }
  }

  $scope.getBooks();

  $scope.$watch('data.books', function() {
    if($scope.data.books) {
      if($scope.data.books.length > 0) {
        $scope.data.loading_books = false;

        if ($scope.data.selected_book) {
          if($scope.data.selected_book.selected_verse) {
            $scope.scrollToVerse($scope.data.selected_book.selected_verse);
          }
        }
      } else {
        $scope.data.loading_books = true;
      }
    } else {
      $scope.data.loading_book = true;
    }
  });

  if($routeParams) {
    if($routeParams.object_id=='reference') {
      if($routeParams.object_data) {
        console.log('Lookup: ' + $routeParams.object_data);
        var reference = $routeParams.object_data.toLowerCase().trim();
        var regexs = /\s*:\s*/
        var reference_parts = reference.split(regexs);
        var reference_data = $scope.data.reference_data;
        if(reference_parts[0]) {
          is_chapter = reference_parts[0].match(/\d+\s*$/gi);
          if(is_chapter) {
            reference_data['chapter'] = is_chapter[0];
          }
          reference_data['book'] = reference_parts[0].replace(/\d+\s*$/g, '');
        }

        if(reference_parts[1]) {
          reference_data['verses'] = reference_parts[1].split(',');
        }


        if(reference_data['book']) {
          $scope.data.reference_data = reference_data;
          var found_book = $scope.findBook(reference_data['book']);
          if(reference_data['chapter']) {
            $scope.selectBook(found_book);
            $scope.$watch('data.chapter_range', function() {
              if($scope.data.chapter_range) {
                if($scope.data.chapter_range.length > 0) {
                  if($scope.data.chapter_range.indexOf(+reference_data['chapter']) >= 0) {
                    $scope.openChapter(reference_data['chapter']);
                    if(reference_data['verses']) {
                      if($scope.data.selected_book) {
                        if($scope.data.selected_book.verses) {
                          $scope.openVerse(reference_data['verses']);
                        }
                      }
                    }
                  }
                }
              }
            });
          } else {
            $scope.selectBook(found_book);
          }
        }
      }
    }
  }
}
);
