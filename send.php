<?php
require_once('db.php');

$text = $_POST['text'];
$room = $_POST['room'];
$data = $_POST['data'];
$ip = $_SERVER['REMOTE_ADDR'];

$q = $db->prepare('INSERT INTO nodes (text, ip, room, data) VALUES (:text, :ip, :room, :data)');
echo $q->execute(array( 'text' => $text, 'ip' => $ip, 'room' => $room, 'data' => $data));

?>
