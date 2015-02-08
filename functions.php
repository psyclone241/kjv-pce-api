<?php
	function check_var($var_name) {
		return (isset($_GET[$var_name]) ? $_GET[$var_name] : null);
	}
?>