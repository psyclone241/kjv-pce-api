<?php
	function check_var($var_name) {
		return (isset($_GET[$var_name]) ? $_GET[$var_name] : null);
	}

	function array_to_xml($array, &$xml) {
	    foreach($array as $key => $value) {
	        if(is_array($value)) {
	            if(!is_numeric($key)){
	                $subnode = $xml->addChild("$key");
	                array_to_xml($value, $subnode);
	            } else {
	            	$subnode = $xml->addChild("entry id='" . $key . "'");
	                array_to_xml($value, $subnode);
	            }
	        } else {
	            $xml->addChild("$key","$value");
	        }
	    }
	}
?>