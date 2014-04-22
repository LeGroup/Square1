<?php
require_once('db.php');

$id = $_POST['id'];

$q = $db->prepare('DELETE from nodes WHERE id = :id');
echo $q->execute(array('id' => $id));

?>%  
