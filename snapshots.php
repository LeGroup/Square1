<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Snapshots</title>
		<style>
		html { width: 100%; }
		body { margin-left: auto; margin-right: auto; text-align: center; width: 100%;}
		ul { padding: 0; display: inline-block; }
		li {
			font-family: 'Roboto Slab', serif;
			background-color: #f1f1f1;
			padding: 8px;
			border: 1px outset #cbcbcb;
			border-radius: 3px;
			box-shadow: inset 0 -15px 3px rgba(0,0,0,0.05);
			
			font-size: 1.1em;
			font-weight: 300;
			color: #888;
			list-style: none;
			width: 120px;
			margin-bottom: 4px;
		}
		a { text-decoration: none; }
		a:visited { color: black; }
		</style>
	</head>
	<body>
		<?php
		require_once('db.php');

		$room = $_GET['room'];
		$q = $db->prepare('select id from saved where room = :room order by id');
		$q->execute(array( 'room' => $room ));

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
		echo "<br/>";
		echo "<li><a href='index.php?room=" . $room . "'>Back</a>";
		echo "</ul>";

		?>
	</body>
</html>
