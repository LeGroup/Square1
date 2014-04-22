<?php
require_once('db.php');

$xpos = $_POST['xPosition'];
$ypos = $_POST['yPosition'];
$id = $_POST['id'];

$q = $db->prepare('UPDATE nodes SET xPosition = :xpos, yPosition = :ypos WHERE id = :id');
echo $q->execute(array( 'xpos' => $xpos, 'ypos' => $ypos, 'id' => $id ));

?>%  
