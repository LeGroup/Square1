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

function angle($elem, x, y)
{
	var eoff=$elem.offset();
	var dx=x - (eoff.left + ($elem.width()/2));
	var dy=y - (eoff.top + ($elem.height()/2));
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
	var header_rotating=false;
	var starta=0;
	var $node_to_rotate=null;
	var lastr=0;

	$header.on("mousedown", function(e)
	{
		header_rotating=true;
		$node_to_rotate=$(this).parent();
		starta=$node_to_rotate.data("angle") ? $node_to_rotate.data("angle") : angle($node_to_rotate, e.pageX, e.pageY);
		console.log(starta);
		return false;
	});
	$(document).on("mousemove", function(e)
	{
		if(header_rotating)
		{
			lastr=starta-angle($node_to_rotate, e.pageX, e.pageY);
			lastr;
			rotate($node_to_rotate, starta-lastr);
		}
	}).on("mouseup", function(e)
	{
		header_rotating=false;
		if($node_to_rotate)
		{
			$node_to_rotate.data("angle", lastr);
		}
	});
	var a=0;
	var $e=$("<span class='node'>" + node.text + "</span>");
	$e.append($header);
	$e.click(function()
	{
		// Get the maximum z-index of nodes
		var maxw=Math.max.apply(
			this,
			$(".node").map(function() { return parseInt($(this).css("zIndex"), 10); })
		);
		// Assign z-index of maximum + 1 to make this the topmost node.
		$(this).css("zIndex", maxw+1);
	});
	$e.draggable({cursor: "move", stack: ".node"});
	$e.mouseover(function()
	{
		$header.stop().fadeIn();
	}).mouseleave(function()
	{
		$header.stop().fadeOut();
	});
	$(document.body).append($e);
}

$(function() {
	$(".node").remove();
	getNodes(maxID);
	setInterval(function() { GetNodes(maxID); }, 5000 );
});
})();
