<?php
require_once('db.php');

$q = $db->prepare('select text, id, time, xPosition, yPosition, color from nodes where id > :max and room = :room order by time');
$q->execute(array( 'max' => $_POST['max'], 'room' => $_POST['room'] ));

$obj = new StdClass();
$obj->nodes = $q->fetchAll();

$q = $db->prepare('select max(id) from nodes where room = :room');
$q->execute(array( 'room' => $_POST['room'] ));
$obj->max = $q->fetchColumn();

echo json_encode($obj);

?>
