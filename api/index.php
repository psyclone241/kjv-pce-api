<?php
    include('api_settings.php');
    include('functions.php');
    include('get_vars.php');

    if(array_search($key, $_api_keys)) {
        $db = new SQLite3($_db);

        if($get_section) {
            if(($get_section == 'OT') || ($get_section == 'NT')) {
                if($get_section == 'OT') {
                    $query = "SELECT * FROM 'Old_Testament_Books'";
                } elseif ($get_section == 'NT') {
                    $query = "SELECT * FROM 'New_Testament_Books'";
                } else {
                    $query = "SELECT * FROM 'Books'";
                }
            }
        } elseif($get_books) {
            if($section) {
                if($section == 'OT') {
                    $query = "SELECT * FROM 'Old_Testament_Books'";
                } else {
                    $query = "SELECT * FROM 'New_Testament_Books'";
                }
            } else {
                $query = "SELECT * FROM 'Books'";
            }
        } elseif($get_chapters) {
            if($book) {

                if($include_data) {
                    $columns = '*';
                } else {
                    $columns = 'Chapter';
                }

                $query = "SELECT " . $columns . " FROM Bible WHERE ";
                if(is_numeric($book)) {
                    $book_query = "BookID='" . $book . "'";
                } else {
                    if(strlen($book) > 3) {
                        $book_query = "BookName='" . $book . "'";
                    } else {
                        $book_query = "BookAbr='" . $book . "'";
                    }
                }
                $query .= $book_query . " GROUP BY BookID,Chapter ORDER BY Chapter";
            }
        } elseif($get_verses) {
            if(($book) && ($chapter)) {

                if($include_data) {
                    $columns = '*';
                } else {
                    $columns = 'Verse';
                }

                $query = "SELECT " . $columns . " FROM Bible WHERE ";
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
                $query .= " AND Chapter='" . $chapter . "'";
                $query .= " GROUP BY Chapter, Verse ORDER BY Chapter";
            }
        } else {
            $query = "SELECT * FROM Bible WHERE ";
            $and = false;

            if($section) {
                $idRange = makeSectionQuery($section);
                if($and) {
                    $query .= " AND ";
                }
                $query .= "BookID " . $idRange;
                $and = true;
            }

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
                if($and) {
                    $query .= " AND ";
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
                } elseif($match == 'exact') {
                    $keyword_query .= "'% " . $keyword . " %'";
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

        if($case_insensitive) {
            $query .= " COLLATE NOCASE";
        }

        try {
            $data = array();
            $data['query'] = $query;
            $data['result_count'] = 0;
            $data['columns'] = '';
            $data['results'] = array();

            $result = $db->query($query) or die(print(json_encode($data)));
            if(count($result) > 0) {
                $new_data = array();
                $columns = '';
                $row_count = 0;
                while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                    if($row_count == 0) {
                        foreach($row as $key => $value) {
                            if($columns != '') {
                                $columns .= ',';
                            }
                            $columns .= $key;
                        }
                    }
                    array_push($new_data,$row);
                    $row_count++;
                }

                $data['columns'] = $columns;
                $data['result_count'] = count($new_data);
                $data['results'] = $new_data;
            }

            if($output == 'xml') {
                $xmlstr = "<?xml version='1.0' encoding='UTF-8'?>\n<data></data>";
                $xml = new SimpleXMLElement($xmlstr);
                $xml->addChild('query',$data['query']);
                $xml->addChild('result_count',$data['result_count']);
                $xml->addChild('columns', $data['columns']);
                $node = $xml->addChild('results');
                array_to_xml($data['results'], $node);
                print($xml->asXML());
            } elseif ($output == 'csv') {
                if($get_file) {
                    header("Content-Type: text/csv");
                    header('Content-disposition: attachment;filename=kjv_output.csv');                    
                }
                $headers = explode(',', $data['columns']);
                $fp = fopen("php://output", "w");
                fputcsv ($fp, $headers, ",");
                foreach($data['Entries'] as $row){
                    fputcsv($fp, $row, ",");
                }
                fclose($fp);
            }else {
                header('Content-Type: application/json');
                $json = json_encode($data);
                print($json);
            }

        } catch(Exception $exception) {
            echo $exception->getMessage();
        }
    } else {
        print('You must get an API key assigned.  They are free, just email <a href="mailto:psyclone241@gmail.com">'
            . 'psyclone241@gmail.com</a> and request an API Key');
    }
?>
