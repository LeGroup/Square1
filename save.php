<?php
require_once('db.php');

$html = $_POST['html'];

$q = $db->prepare('INSERT INTO saved (html) VALUES(:html)');
$q->execute(array( 'html' => $html));

?>%  
