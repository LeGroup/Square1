<!DOCTYPE html>
<html lang="en">
	<head>	
		<meta charset="UTF-8"></meta>
		<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
		<meta name="viewport" content="width=device-width" />

		<link href='http://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css">

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
				top: 0;
				right: 4px;
			}
			.close {
				font-size: 16pt;
				/*display: none;*/
				position: absolute;
				/*top: -20px;*/
				top: 0;
				left: 4px;
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
			#save { display: none; }
		</style>

		<style>
			html {margin: 0; padding: 0; width: 100%; height: 100%; }
			body {width: 100%; height: 100%; overflow: hidden;}
			iframe { width: 100%; height: 100%; overflow: hidden;}
			#swap { position: fixed; top: 0; right: 0; height: 60px; width: 80px; z-index: 9999; max-width: 80px; max-height: 60px;}
			#home { position: fixed; top: 0; right: 80px; height: 60px; width: 80px; z-index: 9999; max-width: 80px; max-height: 60px;}
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
			.front { z-index: 2; }
			.back { -webkit-transform: rotateY(-180deg); }
		</style>
	</head>
	<body>
		<div class="flip-container">
			<?php require_once("getsaved.php");?>
		</div>
	</body>
</html>
