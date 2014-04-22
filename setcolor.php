<?php
require_once('db.php');

$color = $_POST['color'];
$id = $_POST['id'];

$q = $db->prepare('UPDATE nodes SET color = :color WHERE id = :id');
echo $q->execute(array( 'color' => $color, 'id' => $id ));

?>%  
