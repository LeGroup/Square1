<?php
require_once('db.php');

$text = $_POST['text'];
$room = $_POST['room'];
$ip = $_SERVER['REMOTE_ADDR'];

$q = $db->prepare('INSERT INTO nodes (text, ip, room) VALUES (:text, :ip, :room)');
echo $q->execute(array( 'text' => $text, 'ip' => $ip, 'room' => $room ));

?>