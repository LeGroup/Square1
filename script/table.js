(function() {

"use strict";

var lorem=[
"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
"Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.",
"Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.",
"Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.",
"Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem.",
"Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius.",
"Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.",
"Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.",
"Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum."];

var maxID=0;

function getNodes(max) {
	$.post('fetch.php', { max: max, room: Room }, function(response) {
		//console.log('PHP: ' + response);
		var obj = JSON.parse(response);
		var nodes = obj.nodes;
		maxID = obj.max;
		for(var node in nodes) {
			addNode(nodes[node]);
		}
	});
}

function getOffsetWithoutRotation($elem) {
	// jQuery has a bug where .offset() with css rotated element
	// returns garbage. Therefore we need to disable the rotation
	// and then get the offset and put the rotation back.
	var t=$elem.css("transform");
	$elem.css("transform", "");
	var off=$elem.offset();
	$elem.css("transform", t);
	return off;
}

function angle($elem, x, y)
{
	var off=getOffsetWithoutRotation($elem);
	var x_=(off.left + ($elem.outerWidth(false)/2));
	var y_=(off.top + ($elem.outerHeight(false)/2));
	var dx=x - x_;
	var dy=y - y_;
	return (Math.atan2(dy, dx) * 180 / Math.PI);
}

function rotate($elem, deg)
{
	$elem.css({
		'-moz-transform':'rotate('+deg+'deg)',
		'-webkit-transform':'rotate('+deg+'deg)',
		'-o-transform':'rotate('+deg+'deg)',
		'-ms-transform':'rotate('+deg+'deg)',
		'transform': 'rotate('+deg+'deg)'
	});
}

function getBbox(elem)
{
	var off=$(elem).offset();
	return {
		left: off.left,
		right: off.left + $(elem).outerWidth(true),
		top: off.top,
		bottom: off.top + $(elem).outerHeight(true)
	};
}
function insideBbox(bbox, x, y)
{
	return (x > bbox.left && x < bbox.right &&
		y > bbox.top && y < bbox.bottom);
}

function addNode(node)
{
	$('#no-found').remove();
	var $header=$("<header class='rotate'>↻</header>");
	var $close=$("<header class='close'>✖</header>");
	var header_rotating=false;
	var starta=0;
	var $node_to_rotate=null;
	var last_angle=0;
	var last_rotation=0;
	var correction=null;

	$header.on("mousedown touchstart", function(e)
	{
		header_rotating=true;
		$node_to_rotate=$(this).parent();

		var pagex=e.pageX ? e.pageX : e.originalEvent.touches[0].pageX
		var pagey=e.pageY ? e.pageY : e.originalEvent.touches[0].pageY

		// Correction is needed because the starting angle of the rotation is wrong, caused
		// by the fact that the rotation button is in the corner of the rotated node.
		if(correction===null) correction=Math.ceil(angle($node_to_rotate, pagex, pagey));
		return false;
	});
	$(document).on("mousemove touchmove", function(e)
	{
		var pagex=e.pageX ? e.pageX : e.originalEvent.touches[0].pageX
		var pagey=e.pageY ? e.pageY : e.originalEvent.touches[0].pageY
		if(header_rotating)
		{
			$e.draggableTouch("disable");
			last_rotation=last_angle-angle($node_to_rotate, pagex, pagey) + correction;
			rotate($node_to_rotate, last_angle-last_rotation);
			last_angle=last_angle-last_rotation;
		}
	}).on("mouseup touchend", function(e)
	{
		header_rotating=false;
		$e.draggableTouch({cursor: "move", stack: ".node"});
	});
	var a=0;
	var $e=$("<span class='node'>" + node.text + "</span>");
	$e.append($close);
	$e.append($header);
	$e.on("click touchstart", function()
	{
		// Get the maximum z-index of nodes
		var maxw=Math.max.apply(
			this,
			$(".node").map(function() { return parseInt($(this).css("zIndex"), 10); })
		);
		// Assign z-index of maximum + 1 to make this the topmost node.
		$(this).css("zIndex", maxw+1);
	});
	$e.draggableTouch({cursor: "move", stack: ".node"});
/*
	$e.mouseover(function()
	{
		$header.stop().fadeIn();
		$close.stop().fadeIn();
	}).mouseleave(function()
	{
		$header.stop().fadeOut();
		$close.stop().fadeOut();
	});
*/
	$close.click(function()
	{
		$close.parent().css("visibility", "hidden");
	});
	$(document.body).append($e);
}

$(function() {
	$(".node").remove();
	getNodes(maxID);
	setInterval(function() { getNodes(maxID); }, 5000 );
	document.onclick=function(e) { e.preventDefault(); return false; }
	document.ontouchstart=function(e) { e.preventDefault(); return false; }
	document.ontouchmove=function(e) { e.preventDefault(); return false; }
	//document.ontouchend=function(e) { e.preventDefault(); return false; }
});
})();
