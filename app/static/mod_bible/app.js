angular
  .module('KJVPCE-Bible', ['ngRoute', 'http-service', 'log-service'])
  .config(['$routeProvider', function($routeProvider, HTTPService, LogService) {
    $routeProvider
      .when('/', {
          templateUrl: '../static/mod_bible/main.html',
          controller: 'MainController'
      })
      .otherwise({ redirectTo: '/' });
  }])
  .controller('MainController', [
    '$scope',
    '$http',
    function($scope, HTTPService) {
      $scope.data = {
        'books': [],
        'selected_book': null,
        'chapter_range': null,
        'verse_range': null,
      };

      $scope.getBooks = function() {
        HTTPService.get('http://192.168.1.13:9100/bible/get_books/').then(function (data) {
          $scope.data.books = data.data.results;
        });
      };

      $scope.getChapters = function(book_id) {
        if(book_id) {
          var data = HTTPService.get('http://192.168.1.13:9100/bible/get_chapters/' + book_id + '/verses').then(function (data) {
            return data;
          });
          return data;
        } else {
          return null;
        }
      };

      $scope.getChapter = function(book_id, chapter_id, verse_id) {
        if(book_id) {
          var data = HTTPService.get('http://192.168.1.13:9100/bible/lookup/' + book_id + '/' + chapter_id + '/' + verse_id).then(function (data) {
            return data;
          });
          return data;
        } else {
          return null;
        }
      };

      $scope.selectBook = function() {
        if($scope.data.selected_book) {
          $scope.getChapters($scope.data.selected_book.book_id).then(function (data) {
            $scope.data.selected_book = data.data.results;

            var chapter_range = []
            var chapter_max = data.data.results.chapters.count;
            for(var i=1; i<=chapter_max; i++) {
              chapter_range.push(i);
            }
            $scope.data.chapter_range = chapter_range;
          });
        } else {
          console.log('Nothing selected');
        }
      };

      $scope.openChapter = function(chapter_id) {
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
      };

      $scope.openVerse = function(verse) {
        $scope.data.selected_book.selected_verse = verse;
        console.log($scope.data.selected_book);

        $scope.getChapter($scope.data.selected_book.book_id, $scope.data.selected_book.selected_chapter.chapter_id, $scope.data.selected_book.selected_verse).then(function (data) {
          $scope.data.selected_book.text = data.data.results;
        });
      }

      $scope.getBooks();
    }
]);
