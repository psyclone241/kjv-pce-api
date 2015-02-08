<?php
    $key = check_var('key');
    $section = check_var('section');
    $book = check_var('book');
    $chapter = check_var('chapter');
    $verses = check_var('verses');
    if(check_var('verse')) {
        $verses = check_var('verse');
    }
    $keyword = check_var('keyword');
    $match = check_var('match');
    $get_section = check_var('get_section');
    $get_books = check_var('get_books');
    $get_chapters = check_var('get_chapters');
    $get_verses = check_var('get_verses');
    $include_data = check_var('include_data');
    $case_insensitive = check_var('insensitive');
?>