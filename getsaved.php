<?php
require_once('db.php');

$q = $db->prepare('select html from saved where id = :id');
$q->execute(array( 'id' => $_GET['id']));

$htmlarr = $q->fetchAll();
$html = $htmlarr[0]["html"];

echo $html;

?>
