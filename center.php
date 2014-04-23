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
				padding: 0;
				display: inline-block;
				width: 290px;
				z-index: 11;
				-webkit-animation-fill-mode: forwards;
				text-align: center;
			}
			.node:hover {
				cursor: move !important;
			}
			.node .flipper {
			}
			.node .flipper > .front, .back {
				position: relative;
				padding: 40px;
			}
			.node .front {
				box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
				background-color: white;
				border: 1px solid #093;
			}
			.node .back {
				text-align: center;
				box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
				background-color: white;
				border: 1px solid #093;
			}
			.rotate {
				font-size: 16pt;
				/*display: none;*/
				position: absolute;
				/*top: -20px;*/
				bottom: 4px;
				right: 4px;
				display: none;
			}
			.back .rotate { display: block; }
			.close {
				font-size: 16pt;
				/*display: none;*/
				position: absolute;
				/*top: -20px;*/
				top: 0;
				right: 4px;
			}
			.color {
				display: inline-block;
				width: 30px;
				height: 30px;
				margin-right: 8px;
				border-radius: 6px;
				border: 1px solid lightgrey;
			}
			.color1 { background-color: white; }
			.color2 { background-color: #FAA; }
			.color3 { background-color: #AAF; }
			.color4 { background-color: #AFA; }
			.color5 { background-color: #FFA; }
			#flash {
				width: 100%; height: 100%;
				display: none;
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(255,255,255,1.0);
				z-index: 999;
			}
		</style>

		<style>
			html {margin: 0; padding: 0; width: 100%; height: 100%; }
			body {width: 100%; height: 100%; overflow: hidden;}
			iframe { width: 100%; height: 100%; overflow: hidden;}
			#swap { position: fixed; top: 0; right: 0; height: 60px; width: 80px; z-index: 9999; max-width: 80px; max-height: 60px;}
			.leftButton { position: fixed; top: 0; right: 80px; height: 60px; width: 80px; z-index: 9999; max-width: 80px; max-height: 60px;}
			.flip-container { -webkit-perspective: 1000; -webkit-transform-style: preserve-3d; }
			.flipped .flipper { -webkit-transform: rotateY(180deg); z-index: 1000; }
			.flip-container .front { rotateY(180deg); }
			body > .flip-container, #container > .flipper > .front, #container > .flipper > .back {
				width: 100%;
				height: 800px;
				padding: 0;
			}
			.flipper { -webkit-transition: 0.6s; -webkit-transform-style: preserve-3d; position: relative;}
			.front, .back { -webkit-backface-visibility: hidden; position: absolute; top: 0; left: 0; }
			.front { z-index: 2; overflow: visible !important;}
			.back { -webkit-transform: rotateY(-180deg); }
			.camera { background-color: white; z-index: 999; position: fixed; border: 1px solid black; border-radius: 4px; bottom: 0px; width: 200px; text-align: center; left: 50%; margin-left: -100px; }
		</style>
		<script type="text/javascript">var Room="<?php echo $_GET['room']; ?>";</script>
		<script>
			$(function()
			{
				$("#home").hide();
				$("#swap").on("click", function(e)
				{
					$("#home").toggle();
					$("#container").toggleClass("flipped");
				});
				$("iframe").on("load", function()
				{
					$contents = $("iframe").contents();
					$contents.find("#google").on("click", function()
					{
						$("#frame").attr("src", "http://www.google.fi/custom?q=" + $contents.find("#googlequery").val());
					});
					$contents.find("#wikipedia").click(function()
					{
						$("#frame").attr("src", "http://fi.wikipedia.org/w/index.php?search=" + escape($contents.find("#wikipediaquery").val()));
					});
				});
				$("#home").on("click", function()
				{
					$("#frame").attr("src", "search.html");
				});
				$(window).on("resize", function()
				{
					$(".camera").css({top: $(window).height()-$(".camera").outerHeight()>>1 + "px"});
				});
				$(".camera").css({top: $(window).height()-$(".camera").outerHeight()>>1 + "px"});
			});
		</script>
	</head>
	<body>
		<div id="flash"></div>
		<!--<button id="save" class="leftButton">Save</button>-->
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
<!--
					<div id="url">
						<a href="http://legroup.aalto.fi/square1/square1_test/show.php?id=12">http://legroup.aalto.fi/square1/square1_test/show.php?id=12</a>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
