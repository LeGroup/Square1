<!DOCTYPE html>
<html lang="en">
	<head>	
		<meta charset="UTF-8"></meta>

		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">

		<script src="script/jquery.js"></script>
		<script src="script/jquery.draggableTouch.js"></script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
		<script src="script/jQueryRotateCompressed.js"></script>
		<script src="script/table.js"></script>

		<style>
			html,body {
				width: 100%;
				height: 100%;
				-webkit-user-select: none;
				-webkit-touch-callout: none;
			}
			#dummy { width: 100%; height: 40%; }
			#top {
				position: absolute;
				top: 0;
				left: 20%;
				width: 60%;
				height: 40%;
				background-color: #EFEFEF;
				margin-left: auto;
				margin-right: auto;
			}
			#left {
				float: left;
				width: 20%;
				height: 100%;
				background-color: #EFDFEF;
			}
			#right {
				float: right;
				width: 20%;
				height: 100%;
				background-color: #EFDFEF;
			}
			#bottom {
				position: absolute;
				bottom: 0;
				left: 20%;
				width: 60%;
				height: 40%;
				background-color: #EFEFEF;
				margin-top: auto;
				margin-left: auto;
				margin-right: auto;
			}
			.node {
				margin: 10px;
				padding: 10px;
				display: inline-block;
				white-space: pre-wrap;
				box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
				background-color: white;
				border: 1px solid #093;
				max-width: 200px;
				content: "↺";
			}
			.rotate {
				/*display: none;*/
				position: absolute;
				/*top: -20px;*/
				top: 0;
				right: 4px;
			}
			.close {
				/*display: none;*/
				position: absolute;
				/*top: -20px;*/
				top: 0;
				left: 4px;
			}
		</style>
	</head>
	<body>
		<?php
			$id = strtolower($_GET['room']);
			if(strlen($id) > 30) { die('<p class="error">The name of the room must be less than 30 characters</p>'); }
			if(empty($id)) { die('<p class="error">Error: no room name given</p>'); }
			
			$get = $_GET;
			$get['m'] = "Write";
			$url = http_build_query($get);
		?>
		<div id="canvas"><div id="no-found">Empty room<br>Why don't try to <a href="?<?php echo $url; ?>">write a note</a>?</div></div>
		<script type="text/javascript">var Room="<?php echo $_GET['room']; ?>";</script>
	</body>
</html>
