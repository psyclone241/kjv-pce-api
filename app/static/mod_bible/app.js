angular
  .module('KJVPCE-Bible', ['ngRoute', 'ui.bootstrap', 'http-service', 'log-service'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, HTTPService, LogService) {
    $routeProvider
      .when('/', {
        templateUrl: '../static/mod_bible/main.html',
        controller: 'MainController',
        reloadOnSearch: false,
      })
      .when('/lookup', {
        templateUrl: '../static/mod_bible/lookup.html',
        controller: 'LookupController',
        reloadOnSearch: false,
      })
      .otherwise({ redirectTo: '/' });

      // $locationProvider.html5Mode({enabled: true, requireBase: false});
  }])
  .run(function($rootScope, $routeParams) {
  })
  .controller('MainController',
    function($scope, $http, HTTPService, LogService) {
      var objectName = 'controllers.mod_bible.MainController';
  })
  .controller('LookupController',
    function($scope, $http, $anchorScroll, $location, HTTPService, LogService) {
      var objectName = 'controllers.mod_bible.LookupController';
      $anchorScroll.yOffset = 60;
      $scope.column_width = '40%';
      $scope.hideSelector = false;

      $scope.data = {
        'books': [],
        'selected_book': null,
        'chapter_range': null,
        'verse_range': null,
      };

      $scope.collapseSelector = function() {
        if($scope.hideSelector) {
          $scope.hideSelector = false;
        } else {
          $scope.hideSelector = true;
        }
      };

      $scope.getBooks = function() {
        HTTPService.get(config.api_url + 'get_books/').then(function (data) {
          $scope.data.books = data.results;
        });
      };

      $scope.selectBook = function() {
        if($scope.data.selected_book) {
          HTTPService.get(config.api_url + 'get_chapters/' + $scope.data.selected_book.book_id + '/verses').then(function (data) {
            $scope.data.selected_book = data.results;
            var chapter_range = []
            var chapter_max = data.results.chapters.count;
            for(var i=1; i<=chapter_max; i++) {
              chapter_range.push(i);
            }
            $scope.data.chapter_range = chapter_range;
          });
          $scope.setAnchorScroll('chapter_select');
        } else {
          console.log('Nothing selected');
        }
      };

      $scope.openChapter = function(chapter_id) {
        console.log(chapter_id);
        var selected_chapter = null;
        angular.forEach($scope.data.selected_book.verses.by_chapter, function(value, key) {
          if(value.chapter_id == chapter_id) {
            selected_chapter = value;
          }
        });

        if(selected_chapter) {
          $scope.data.selected_book.selected_chapter = selected_chapter;
          var verse_range = []
          var verse_max = selected_chapter.verse_id;
          for(var i=1; i<=verse_max; i++) {
            verse_range.push(i);
          }
          $scope.data.verse_range = verse_range;
        }

        $scope.setAnchorScroll('verse_select');
      };

      $scope.openVerse = function(verse_id) {
        HTTPService.get(config.api_url + 'lookup/' + $scope.data.selected_book.book_id + '/' + $scope.data.selected_book.selected_chapter.chapter_id).then(function (data) {
          $scope.data.selected_book.text = data.results;
          $scope.scrollToVerse(verse_id);
          console.log($scope.data.selected_book);
        });
      }

      $scope.scrollToVerse = function(verse_id) {
        $scope.data.selected_book.selected_verse = verse_id;
        var scroll_to_verse_id = '';
        angular.forEach($scope.data.selected_book.text, function(value, key) {
          if(value.verse_id == verse_id) {
            scroll_to_verse_id = value.id;
          }
        });

        $scope.hideSelector = true;

        scroll_target = 'anchor_' + scroll_to_verse_id;
        $scope.setAnchorScroll(scroll_target);
      }

      $scope.setAnchorScroll = function(scroll_target) {
        $location.hash(scroll_target);
        $location.path('/lookup');
        $anchorScroll();
      }

      $scope.unsetChapter = function() {
        $scope.data.selected_book.selected_chapter = null;
        $scope.unsetVerse();
      }

      $scope.unsetVerse = function() {
        $scope.data.selected_book.selected_verse = null;
      }

      $scope.scrollToTopVerse = function() {
        $scope.scrollToVerse(1);
        $scope.setAnchorScroll('verse_select');
        $scope.hideSelector = false;
      };

      $scope.getBooks();
    }
);
