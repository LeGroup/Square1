(function() {

/* Copied from http://stackoverflow.com/questions/6177454/can-i-force-jquery-cssbackgroundcolor-returns-on-hexadecimal-format
 * to make $.css("backgroundColor") return color in hex instead of rgb(x,x,x). */
$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}


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

function updatePosition($node)
{
	var pos = getPositionFromTransform($node);
	$.post('setposition.php', { xPosition: pos.x, yPosition: pos.y, id: $node.data("id") });
}

function removeNode($node)
{
	$.post('removenode.php', { id: $node.data("id") });
	$node.remove();
}
function updateColor($node, color)
{
	$.post('setcolor.php', { color: color, id: $node.data("id") });
}

function getPositionFromTransform($elem) {
	var matrix=$elem.css('transform').split(",");
	var x = matrix[4].slice(1);
	var y = matrix[5].slice(1, -1);
	return {x: x, y: y};
}
function saveCanvas()
{
	var html=$("#container .front").clone().html();
	$.post('save.php', { html: html });
}

function flip($node, e)
{
	$node.toggleClass("flipped");
	return false;
}

function addNode(node)
{
	$('#no-found').remove();
	//var $flipButton=$("<header class='rotate'>⚙</header>");
	var $flipButton=$("<img>", {
		width: "18px",
		src: "http://upload.wikimedia.org/wikipedia/commons/5/5a/Gear_shape_black_09.svg",
		class: "rotate"
	});
	var $flipButton_back=$flipButton.clone();
	var $close=$("<header class='close'>✖</header>");
	var $node=$("<span>",  { class: "node flip-container" });
	var $flipper = $("<div>", { class: "flipper" });
	var $nodeFront = $("<div>", { class: "front" });
	var $nodeBack = $("<div>", { class: "back" });
	var $colors = $("<div>");
	$colors.append($("<span>", { class: "color color1" }));
	$colors.append($("<span>", { class: "color color2" }));
	$colors.append($("<span>", { class: "color color3" }));
	$colors.append($("<span>", { class: "color color4" }));
	$colors.append($("<span>", { class: "color color5" }));
	$colors.each(function() {
		$(this).on("mousedown touchstart", function(e)
		{
			var color = $(e.target).css("background-color");
			$nodeFront.css({backgroundColor: color});
			$nodeBack.css({backgroundColor: color});
			updateColor($node, color);
		});
	});

	$flipper.append($nodeBack);
	$flipper.append($nodeFront);
	$node.append($flipper);

	$nodeFront.text(node.text);
	$nodeFront.append($flipButton);

	$nodeBack.append($flipButton_back);
	$nodeBack.append($colors);
	$nodeBack.append($close);

	$flipButton.on("mousedown touchstart", function(e) { flip($node, e) } );
	$flipButton_back.on("mousedown touchstart", function(e) { flip($node, e) } );

	$node.data("id", node.id);
	$node.on("mousedown touchstart", function()
	{
		$(".node").find(".front .rotate").hide();
		$flipButton.show();
		// Get the maximum z-index of nodes
		var maxw=Math.max.apply(
			this,
			$(".node").map(function() { return parseInt($(this).css("zIndex"), 10); })
		);
		// Assign z-index of maximum + 1 to make this the topmost node.
		$(this).css("zIndex", maxw+1);
	}).on("mouseup touchend", function()
	{
		updatePosition($node);
	});
	$(document.body).on("mousedown touchstart", function(e)
	{
		$(".node").find(".front .rotate").hide();
	});
	$close.on("click touchstart", function()
	{
		removeNode($node);
	});

	$("body > #container > .flipper > .front").append($node);
	$nodeBack.css({width: $nodeFront.width(), height: $nodeFront.height()});
	$node.panzoom({cursor: "default"});
	if(!(node.xPosition && node.yPosition)) {
		// Bitshift (>> 1) divides by 2 and floors the remainder
		node.xPosition = ($(document.body).width() >> 1) - ($node.width() >> 1);
		node.yPosition = ($(document.body).height() >> 1) - ($node.height() >> 1);
	}
	console.log(node);
	if(node.color) {
		$nodeFront.css({backgroundColor: node.color});
		$nodeBack.css({backgroundColor: node.color});
	}
	$node.css({webkitTransform: "translate(" + node.xPosition + "px, " + node.yPosition + "px)" });
	$(document.body).on('mousewheel.focal', function(e) {e.preventDefault();});
}

$(function() {
	$(".node").remove();
	getNodes(maxID);
	setInterval(function() { getNodes(maxID); }, 5000 );
	$("#save").click(function()
	{
		saveCanvas();
		$("#flash").show().animate({backgroundColor: "rgba(255, 255, 255, 0.0)"}, 450, function()
		{
			$("#flash").hide().css({backgroundColor: "rgba(255, 255, 255, 1.0)"});
		});
	});
});

})();
