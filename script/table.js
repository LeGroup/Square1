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

function flip($node, e)
{
	$node.toggleClass("flipped");
	return false;
}

function addNode(node)
{
	$('#no-found').remove();
	var $flipButton=$("<header class='rotate'>↻</header>");
	var $flipButton_back=$("<header class='rotate'>↻</header>");
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
			$nodeFront.css({backgroundColor: $(e.target).css("background-color")});
			$nodeBack.css({backgroundColor: $(e.target).css("background-color")});
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
	});
	$(document.body).on("mousedown touchstart", function(e)
	{
		$(".node").find(".front .rotate").hide();
	});
	$close.on("click touchstart", function()
	{
		$close.parent().parent().parent().remove();
	});

	$("body > #container > .flipper > .front").append($node);
	$nodeBack.css({width: $nodeFront.width(), height: $nodeFront.height()});
	$node.panzoom();
	$(document.body).on('mousewheel.focal', function(e) {e.preventDefault();});
}

$(function() {
	$(".node").remove();
	getNodes(maxID);
	setInterval(function() { getNodes(maxID); }, 5000 );
});

})();
