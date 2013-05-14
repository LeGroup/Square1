<!DOCTYPE html>
<html lang="en">
	<head>	
		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<?php
			$id = strtolower($_GET['room']);
			if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
			if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }
		?>
		<div id="canvas"></div>
		<script type="text/javascript">var Room="<?php echo $_GET['room']; ?>";</script>
		<script src="script/jquery-1.9.1.js" type="text/javascript"></script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js" type="text/javascript"></script>
		<script src="script/jquery.touch-punch.min.js" type="text/javascript"></script>
		<script src="script/raphael-min.js" type="text/javascript"></script>
		<script src="script/jquery.mousewheel.js" type="text/javascript"></script>
		<script src="script/svg-navigation.js" type="text/javascript"></script>
		<script src="script/center.js" type="text/javascript"></script>
	</body>
</html>