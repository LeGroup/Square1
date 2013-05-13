<!DOCTYPE html>
<html lang="en">
	<head>
		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<?php
			$id = strtolower($_GET['room']);
			if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
			if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }
		?>
		<div id="send"></div>
		<div id="save-note"></div>
		<textarea id="text"></textarea>
		<script type="text/javascript">var Room="<?php echo $_GET['room']; ?>";</script>
		<script src="script/jquery-1.9.1.js" type="text/javascript"></script>
		<script src="script/script.js" type="text/javascript"></script>
	</body>
</html>