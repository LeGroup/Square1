<!DOCTYPE html>
<html lang="en">
	<head>
		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="script/jquery.js"></script>
		<script src="flip.js"></script>
	</head>
	<body>
		<?php
			$id = strtolower($_GET['room']);
			if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
			if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }
		?>
		<button id="home" class="leftButton">Home</button>
		<button id="swap">↺</button>
		<div id="container" class="flip-container">
			<div class="flipper">
				<div class="back" id="search">
					<div style="height: 95%; overflow: hidden; text-align: center;">
						<iframe id="frame" src="search.html" width="100%" height="100%"></iframe>
					</div>
				</div>
				<div class="front">
					<div id="send"></div>
					<div id="save-note"></div>
					<textarea id="text" placeholder="Start writing here"></textarea>
				</div>
			</div>
		</div>
		<script type="text/javascript">var Room="<?php echo $_GET['room']; ?>";</script>
		<script src="script/jquery-1.9.1.js" type="text/javascript"></script>
		<script src="script/script.js" type="text/javascript"></script>
	</body>
</html>
