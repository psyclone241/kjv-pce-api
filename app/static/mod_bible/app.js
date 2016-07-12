angular
  .module('KJVPCE-Bible', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'mlt.services', 'mlt.directives', 'mlt.filters', 'ui.contextmenu'])
  .config(function($routeProvider, $provide, $interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
    $interpolateProvider.endSymbol(']}');
    $provide.factory('$routeProvider', function() {
      return $routeProvider;
    });
  })
  .run(function($rootScope, $route, $routeProvider, HTTPService, LogService, $location, $anchorScroll) {
    var object_name = 'config';
    $rootScope.mode = null;
    $rootScope.config = {};
    $rootScope.routes = {};
    $rootScope.routes.enabled = false;
    $rootScope.defaults = {};
    $rootScope.data = {
      'books': [],
      'loading_books':false,
      'selected_book': null,
      'search_mode': false,
      'book_query': {
        'book_name': null,
        'section': 'both'
      },
      'search_parameters': {
        'hide_panel': false,
        'active': false,
        'keywords': {
          'data': null,
          'set': false,
          'match': 'contains'
        },
        'limit_to': ''
      },
      'search_results': {
        'data': null,
        'current_page': 1,
        'max_size': 5,
        'items_per_page': 25,
        'number_of_pages': null
      },
      'reference_lookup': {
        'data': null
      },
      'reference_data': {
        'book': null,
        'chapter': null,
        'verses': null
      },
      'select_another_book': false,
      'select_another_chapter': false,
      'select_another_verse': false,
      'chapter_range': null,
      'verse_range': null,
      'sections': {
        'OT': 'Old Testament',
        'NT': 'New Testament'
      }
    };

    $rootScope.home = function() {
      $location.path('/');
    };

    $rootScope.setAnchorScroll = function(controller_target, scroll_target) {
      $location.hash(scroll_target);
      $location.path('/' + controller_target);
      $anchorScroll();
    }

    $rootScope.clearBookSelection = function() {
      $rootScope.data.selected_book = null;
      $rootScope.data.book_query.book_name = null;
      $rootScope.data.chapter_range = null;
      $rootScope.data.verse_range = null;
      $rootScope.data.search_parameters.active = false;
      $rootScope.data.select_another_book = false;
      $rootScope.data.select_another_chapter = false;
      $rootScope.data.select_another_verse = false;

      $rootScope.setAnchorScroll('lookup', 'book_block');
    };

    $rootScope.selectAnotherBook = function() {
      console.log('Selecting another book');
      $rootScope.data.search_parameters.active = false;
      $rootScope.data.select_another_book = true;
      $rootScope.data.select_another_chapter = false;
      $rootScope.data.select_another_verse = false;
      if($rootScope.data.reference_data) {
        $rootScope.data.reference_data.book = null;
        $rootScope.data.reference_data.chapter = null;
        $rootScope.data.reference_data.verses = null;
      }
      $rootScope.setAnchorScroll('lookup', 'anchor_book_' + $rootScope.data.selected_book.book_id);
    }

    $rootScope.selectAnotherChapter = function() {
      console.log('Selecting another chapter');
      $rootScope.data.search_parameters.active = false;
      $rootScope.data.select_another_book = false;
      $rootScope.data.select_another_chapter = true;
      $rootScope.data.select_another_verse = false;
        $rootScope.data.reference_data.chapter = null;
      if($rootScope.data.reference_data) {
        $rootScope.data.reference_data.verses = null;
      }
      $rootScope.setAnchorScroll('lookup', 'anchor_chapter_' + $rootScope.data.selected_book.selected_chapter.chapter_id);
    };

    $rootScope.selectAnotherVerse = function() {
      console.log('Selecting another verse');
      $rootScope.data.search_parameters.active = false;
      $rootScope.data.select_another_book = false;
      $rootScope.data.select_another_chapter = false;
      $rootScope.data.select_another_verse = true;
      if($rootScope.data.reference_data) {
        $rootScope.data.reference_data.verses = null;
      }
      $rootScope.setAnchorScroll('lookup', 'anchor_verse_' + $rootScope.data.selected_book.selected_verse);
    };

    $rootScope.switchSearchMode = function() {
      if($rootScope.data.search_mode) {
        // If search mode is already on
        $rootScope.data.search_mode = false;
        if($rootScope.data.selected_book) {
          if($rootScope.data.selected_book.selected_verse) {
            $rootScope.setAnchorScroll('lookup', 'anchor_verse_' + $rootScope.data.selected_book.selected_verse);
          }
        }
      } else {
        // If search mode is already off
        $rootScope.data.search_mode = true;
        $rootScope.config.body.navbar_expanded = false;
        $rootScope.setAnchorScroll('lookup', 'lookup_top');
      }
    };

    $rootScope.lookupReference = function() {
      if($rootScope.data.reference_lookup.data) {
        if($rootScope.data.search_mode) {
          $rootScope.data.search_parameters.active = false;
          $rootScope.switchSearchMode();
        }
        $location.path('/lookup/reference/' + $rootScope.data.reference_lookup.data);
      }
    };

    HTTPService.get('../static/mod_bible/config/config.json').then(function(data) {
      var mode = data.mode.current;
      $rootScope.mode = mode;
      $rootScope.config = data[mode];
      $rootScope.defaults = data.defaults;

      $rootScope.config.body = data.defaults.body;
      $rootScope.config.navbar = data.defaults.navbar;
    });

    $routeProvider
      .when('/', {
        templateUrl: '../static/mod_bible/views/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        reloadOnSearch: false,
      })
      .when('/lookup/:object_id?/:object_data?', {
        templateUrl: '../static/mod_bible/views/lookup.html',
        controller: 'LookupController',
        controllerAs: 'lookup',
        reloadOnSearch: false,
      })
      .otherwise({ redirectTo: '/' });
  });
