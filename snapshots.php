<?php
require_once('db.php');

$q = $db->prepare('select id from saved where room = :room order by id');
$q->execute(array( 'room' => $_GET['room'] ));

$snapshots = new StdClass();
$snapshots = $q->fetchAll();
$ret = array();
$i = 1;
echo "<ul>";
foreach($snapshots as $snapshot)
{
	$str = "<li><a href='show.php?id=" . $snapshot["id"] . "'>Snapshot " . $i . "</a></li>";
	echo $str;
	$i+=1;
}
echo "</ul>";

?>
