<?php
$c = $_GET["hacer"];
$f = fopen('hacer.txt', 'a');
fwrite($f, "$c\n-----\n");
fclose($f);
?>