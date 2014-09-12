<?
    $book = $_GET['book'];
    $chapter = $_GET['chapter'];
    $verses = $_GET['verses'];
    $keyword = $_GET['keyword'];
    $match = $_GET['match'];
    $get_books = $_GET['get_books'];

    $db = new SQLite3('KJV-PCE.db');

    if($get_books) {
        $query = "SELECT BookID,BookName,BookAbr FROM Bible GROUP BY BookID ORDER BY BookID";
    } else {
        $query = "SELECT * FROM Bible WHERE ";
        $and = false;
        if($book) {
            if(is_numeric($book)) {
                $book_query = "BookID='" . $book . "'";
            } else {
                if(strlen($book) > 3) {
                    $book_query = "BookName='" . $book . "'";
                } else {
                    $book_query = "BookAbr='" . $book . "'";
                }
            }
            $query .= $book_query;
            $and = true;
        }

        if(($chapter) && (is_numeric($chapter))) {
            if($and) {
                $query .= " AND ";
            }
            $query .= "Chapter='" . $chapter . "'";
            $and = true;
        }

        if($verses) {

            $explode_dash = explode('-', $verses);
            $explode_comma = explode(',', $verses);
            $range = array();
            $verse_query = '';

            if((strpos($verses, '-') && (count($explode_dash) > 0))) {
                $start = $explode_dash[0];
                $end = $explode_dash[1];
                if((is_numeric($start)) && (is_numeric($end))) {
                    $range = range($start,$end);
                }
            } elseif((strpos($verses, ',')) && (count($explode_comma))) {
                if(count($explode_comma) > 0) {
                    foreach($explode_comma as $item) {
                        if(is_numeric($item)) {
                            array_push($range, $item);
                        }
                    }
                }
            } else {
                if(is_numeric($verses)) {
                    array_push($range, $verses);
                }
            }

            if(count($range) == 1) {
                $verse_query = "Verse='" . $range[0] . "'";
            } elseif(count($range) > 1) {
                $verse_query = "Verse IN(";
                $counter = 0;
                foreach($range as $x) {
                    if($counter > 0) {
                        $verse_query .= ",";
                    }
                    $verse_query .= "'" . $x . "'";
                    $counter++;
                }
                $verse_query .= ')';
            } else {
                $verse_query = '';
            }

            if($and) {
                $query .= " AND ";
            }
            $query .= $verse_query;
            if($verse_query) {
                $and = true;
            }
        }

        if(($keyword) && ($match)) {
            $keyword_query = "VText LIKE ";

            if($match == 'contains') {
                $keyword_query .= "'%" . $keyword . "%'";
            } elseif($match == 'startswith') {
                $keyword_query .= "'" . $keyword . "%'";
            } elseif($match == 'endswith') {
                $keyword_query .= "'%" . $keyword . "'";
            } else {
                $keyword_query = '';
            }

            if($and) {
                $query .= " AND ";
            }
            $query .= $keyword_query;

            if($keyword_query) {
                $and = true;
            }
        }
    }


    try {
        $data = array();
        $data['query'] = $query;
        $data['query_success'] = false;
        $data['result_count'] = 0;
        $data['results'] = array();

        $result = $db->query($query) or die(print(json_encode($data)));
        if(count($result) > 0) {
            $data['query_success'] = true;
            $new_data = array();

            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                array_push($new_data,$row);
            }
            $data['result_count'] = count($new_data);
            $data['results'] = $new_data;
        }

        $json = json_encode($data);
        print($json);
    } catch(Exception $exception) {
        echo $exception->getMessage();
    }
?>
