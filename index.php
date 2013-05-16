<?php
	if(!empty($_GET['m']) && $_GET['m'] == 'Write') { require_once('write.php'); die(); }
	if(!empty($_GET['m']) && $_GET['m'] == 'Read') { require_once('center.php'); die(); }
?><!DOCTYPE html>
<html lang="en">
	<head>
		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,300,700,100' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body class="main">
	
	<?php if(!isset($_GET['room'])) : ?>
		<h1>Square1</h1>
		<p>Enter the name of the room you want to join. Not case sensitive.</p>
		<form action="index.php" method="get">
		<p><input type="text" name="room" maxlength="30"></p>
		<p><input type="submit" value="Join room"></p>
		</form>
	<?php else : ?>
		<?php
		$id = strtolower($_GET['room']);
		if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
		if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }
		
		?>
		<h2><?php echo $_GET['room']; ?></h2>
		<p>
			<form action="">	
				<input type="hidden" name="room" value="<?php echo $id; ?>">
				<input type="submit" name="m" value="Write">
				<input type="submit" name="m" value="Read">
			</form>
		</p>
		
		
	<?php endif; ?>
	</body>
</html>