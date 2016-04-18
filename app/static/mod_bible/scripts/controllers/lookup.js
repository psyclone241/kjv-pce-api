angular.module('KJVPCE-Bible')
.controller('LookupController',
function($scope, $route, $uibModal, $routeParams, HTTPService, LogService, $anchorScroll, $location) {
  var object_name = $route.current.controller;
  LogService.logEntry(object_name, 'start', 'Initialize controller');

  $scope.config.screen_name = object_name;
  $scope.config.body.navbar_collapsed = false;
  $scope.config.body.expand_disabled = false;
  $scope.config.body.style = {
    "padding-top": "100px"
  };
  $scope.config.navbar.style = {
    "background-color": "#CECECE",
    "height": "55px"
  };

  var data_url = $scope.config.restUrl;

  $scope.ref_id = null;
  $anchorScroll.yOffset = 120;
  $scope.column_width = '40%';

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

  $scope.getBooks = function(ref_id) {
    HTTPService.get(data_url + 'get_books/').then(function (data) {
      $scope.data.books = data.results;
      if(ref_id) {
        console.log('Lookup up a particular reference');
        $scope.ref_id = ref_id;
        var matched_book = null;
        angular.forEach($scope.data.books, function(value, key) {
          if((value.book_abbr==ref_id) || (value.book_name==ref_id) || (value.book_id==ref_id)) {
            matched_book = value;
          }
        });

        if(matched_book) {
          // console.log(matched_book);
          $scope.data.selected_book = matched_book;
          $scope.selectBook();
        } else {
          console.log('No match found');
        }
      }
    });
  };

  $scope.selectBook = function(book) {
    $scope.data.selected_book = book;
    $scope.data.select_another_book = false;
    if($scope.data.selected_book) {
      console.log('Getting chapters');
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
      console.log('Nothing selected');
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
    angular.forEach($scope.data.selected_book.verses.by_chapter, function(value, key) {
      if(value.chapter_id == chapter_id) {
        selected_chapter = value;
      }
    });

    if(selected_chapter) {
      $scope.unsetChapter();
      $scope.data.selected_book.selected_chapter = selected_chapter;
      $scope.data.search_parameters.chapter.data = selected_chapter;
      $scope.data.select_another_chapter = false;
      var verse_range = []
      var verse_max = selected_chapter.verse_id;
      for(var i=1; i<=verse_max; i++) {
        verse_range.push(i);
      }
      $scope.data.verse_range = verse_range;
    }
  };

  $scope.openVerse = function(verse_id) {
    HTTPService.get(data_url + 'lookup/' + $scope.data.selected_book.book_id + '/' + $scope.data.selected_book.selected_chapter.chapter_id).then(function (data) {
      $scope.data.selected_book.text = data.results;
      $scope.scrollToVerse(verse_id);
    });
  }

  $scope.scrollToVerse = function(verse_id) {
    $scope.data.selected_book.selected_verse = verse_id;
    $scope.data.select_another_verse = false;
    $scope.setAnchorScroll('anchor_verse_' + verse_id);
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

  $scope.setSearchParameter = function(key, value, disables_key) {
    if($scope.data.search_parameters[key].set) {
      $scope.data.search_parameters[key].data = value;
    } else {
      $scope.data.search_parameters[key].data = null;
    }
  }

  $scope.search = function() {
    console.log($scope.data.search_parameters);
    $scope.data.search_parameters.active = true;
    $scope.data.search_parameters.keywords.set = true;
  }

  $scope.clearSearch = function(close) {
    $scope.data.search_parameters.active = false;
    angular.forEach($scope.data.search_parameters, function(value, key) {
      if(key != 'active') {
        value.data = null;
        value.set = false;
      }
    });

    if(close) {
      $scope.data.search_mode = false;
      if($scope.data.selected_book.selected_verse) {
        $scope.setAnchorScroll('anchor_verse_' + $scope.data.selected_book.selected_verse);
      }
    }
  }

  $scope.getBooks($routeParams.ref_id);
  if ($scope.data.selected_book) {
    if($scope.data.selected_book.selected_verse) {
      $scope.scrollToVerse($scope.data.selected_book.selected_verse);
    }
  }
}
);
