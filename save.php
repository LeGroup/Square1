<?php
require_once('db.php');

$room = $_POST['room'];
$html = $_POST['html'];

$q = $db->prepare('INSERT INTO saved (html, room) VALUES(:html, :room)');
$q->execute(array('html' => $html, 'room' => $room));

?>%  
