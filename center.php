<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8"></meta>
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<meta name="viewport" content="width=device-width" />

		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">

		<script src="script/jquery.js"></script>
		<script src="script/jquery.draggableTouch.js"></script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
		<script src="script/jQueryRotateCompressed.js"></script>
		<script src="script/table.js"></script>
		<script src="script/panzoom.js"></script>
		<script src="script/pointertouch.js"></script>
		<script src="script/jquery.animate-colors-min.js"></script>

		<script type="text/javascript">var Room="<?php echo $_GET['room']; ?>";</script>
		<script src="flip.js"></script>
	</head>
	<body>
		<div id="flash"></div>
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
					<?php
						$id = strtolower($_GET['room']);
						if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
						if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }

						$get = $_GET;
						$get['m'] = "Write";
						$url = http_build_query($get);
					?>
					<div id="canvas"><div id="no-found">Empty room<br>Why don't try to <a href="?<?php echo $url; ?>">write a note</a>?</div></div>
					<img height="50" id="save" src="http://upload.wikimedia.org/wikipedia/commons/a/a1/High-contrast-emblem-photos.svg" class="camera"></img>
				</div>
			</div>
		</div>
	</body>
</html>
