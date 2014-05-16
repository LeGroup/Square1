<?php
	if(!empty($_GET['m']) && $_GET['m'] == 'Writing Tool') { require_once('write.php'); die(); }
	if(!empty($_GET['m']) && $_GET['m'] == 'Drawing Tool') { require_once('draw.php'); die(); }
	if(!empty($_GET['m']) && $_GET['m'] == 'Canvas') { require_once('center.php'); die(); }
	if(!empty($_GET['m']) && $_GET['m'] == 'Snapshots') { require_once('snapshots.php'); die(); }
?><!DOCTYPE html>
<html lang="en">
	<head>
		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,300,700,100' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">
		<style>
			.columns {
				-webkit-column-count: 3;
				-moz-column-count: 3;
				column-count: 3;
			}
			.column {
				-webkit-column-break-after: always;
				-moz-column-break-after: always;
				column-break-after: always;
			}
		</style>
	</head>
	<body class="main">
	
	<?php if(!isset($_GET['room'])) : ?>
		<h1>Square1</h1>
		<p>Enter the name of the project you want to join.</br>Or create a new one by giving a name for your new project.</p>
		<form action="index.php" method="get">
		<p><input type="text" name="room" maxlength="30"></p>
		<p><input type="submit" value="Join project"></p>
		</form>
	<?php else : ?>
		<?php
		$id = strtolower($_GET['room']);
		if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
		if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }
		
		?>
		<h2>Project: <?php echo $_GET['room']; ?></h2>
		<form action="">	
			<input type="hidden" name="room" value="<?php echo $id; ?>">
			<input type="submit" name="m" value="Writing Tool">
			<input type="submit" name="m" value="Canvas">
			<input type="submit" name="m" value="Snapshots">
		</form>
		<div class="columns">
			<p class="column">With the Writing Tool you can write and send your notes to the Canvas. In the Square1 set the Writing Tools are the personal tools of the participants.</p>
			<p class="column">The Canvas is the Square1 set's central piece for gathering and arranging the notes created by the participants.</p>
			<p class="column">The Snapshots are images taken from the views of the Canvas. The participants can save different stages of their work to these images. The Snapshots can't be modified.</p>
		</div>
	<?php endif; ?>
	</body>
</html>
