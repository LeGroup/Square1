(function() {

"use strict";

var maxID=0;

function getNodes(max) {
	$.post('fetch.php', { max: max, room: Room }, function(response) {
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

function getOffsetFromMatrix($elem) {
	var matrix=$elem.css('transform').split(",");
	var scalex = matrix[0].slice(7);
	var scaley = matrix[3].slice(1);
	var x = matrix[4].slice(1);
	var y = matrix[5].slice(1, -1);
	return {left: parseInt(x, 10), top: parseInt(y, 10), scalex: scalex, scaley: scaley};
}

function angle($elem, x, y)
{
	var off = getOffsetFromMatrix($elem);
	var x_=(off.left + ($elem.outerWidth(false)/2));
	var y_=(off.top + ($elem.outerHeight(false)/2));
	var dx=x - x_;
	var dy=y - y_;
	return (Math.atan2(dy, dx) * 180 / Math.PI);
}

function rotate($elem, deg)
{
	var off = getOffsetFromMatrix($elem);
	$elem.css({ 'transform': 'translate(' + off.left + 'px, ' + off.top + 'px) rotate('+deg+'deg)' });
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
			last_rotation=last_angle-angle($node_to_rotate, pagex, pagey) + correction;
			rotate($node_to_rotate, last_angle-last_rotation);
			last_angle=last_angle-last_rotation;
		}
	}).on("mouseup touchend", function(e)
	{
		header_rotating=false;
	});
	var a=0;
	var $e=$("<span class='node'>" + node.text + "</span>");
	$e.append($close);
	$e.append($header);
	$e.on("mousedown touchstart", function()
	{
		// Get the maximum z-index of nodes
		var maxw=Math.max.apply(
			this,
			$(".node").map(function() { return parseInt($(this).css("zIndex"), 10); })
		);
		// Assign z-index of maximum + 1 to make this the topmost node.
		$(this).css("zIndex", maxw+1);
	});
	$close.on("click touchstart", function()
	{
		$close.parent().css("visibility", "hidden");
	});
	$(".front").append($e);
	$e.panzoom();
	$(document.body).on('mousewheel.focal', function(e) {e.preventDefault();});
}

$(function() {
	$(".node").remove();
	getNodes(maxID);
	setInterval(function() { getNodes(maxID); }, 5000 );
});
})();
