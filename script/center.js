var maxID = 0;
var Paper;
var nodeType = 'List';

$(function () {
	
	if(nodeType == 'SVG') {
		Paper = Raphael('canvas', $(window).width(), $(window).height());
		$(Paper.canvas).svgNavigation({ paper: Paper });
	}
	GetNodes(maxID);
	setInterval(function() { GetNodes(maxID); }, 5000 );
});

function GetNodes(max) {
	$.post('fetch.php', { max: max, room: Room }, function(response) {
		var obj = JSON.parse(response);
		nodes = obj.nodes;
		maxID = obj.max;
		for(var node in nodes) {
			AddNode(nodes[node]);
		}
		
	});
}

function AddNode(node) {
	switch(nodeType) {
		case 'DOM': DOM_AddNode(node); break;
		case 'SVG': SVG_AddNode(node); break;
		case 'List': List_AddNode(node); break;
	}
}

var draggedElementOriginaPos = { };

function touchStart() {
}

function touchMove() {
}

function touchEnd() {
}

function textWrap(t, width) {
	var content = t.attr('text');
    var abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    t.attr({
      "text" : abc
    });
    var letterWidth = t.getBBox().width / abc.length;
    t.attr({
        "text" : content
    });

    var words = content.split(" ");
    var x = 0, s = [];
    for ( var i = 0; i < words.length; i++) {

        var l = words[i].length;
        if (x + (l * letterWidth) > width) {
            s.push("\n");
            x = 0;
        }
        x += l * letterWidth;
        s.push(words[i] + " ");
    }
    t.attr({
        "text" : s.join("")
    });
}

function List_AddNode(node) {
	if($('#canvas > ul').length == 0) { InitLists(); }
	
	var li = $('<li>');
	li.addClass('list-node');
	li.html(node.text);
	
	var smallest = false;
	$('#canvas > ul').each(function() {
		if(!smallest || $(this).height() < smallest.height())
			smallest = $(this);
	});
	//li.draggable();
	smallest.append(li);
}

function InitLists() {
	$('body').css({ backgroundColor: '#fafafa' });
	
	var columns = $(window).width() / 300;
	columns = Math.floor(columns);
	
	for(var i = 0; i < columns; i++) {
		var ul = $('<ul>');
		ul.addClass('node-list');
		ul.css({ width: 100/columns + '%', float: 'left', margin: 0, padding: 0 });
		ul.sortable({ 
			revert: true,
			connectWith: '#canvas > ul',
			placeholder: 'sortable-placeholder'
		});
		$('#canvas').append(ul);
	}
}

function DOM_AddNode(node) {
	var container = $('<div>');
	container.addClass('dom-node');
	container.html(node.text);
	
	$('#canvas').append(container);
	container.show();
}

function SVG_AddNode(node) {
	var pos = { 
		x: (Math.random() * ($(window).width() * 0.4)) + 'px',
		y: (Math.random() * ($(window).height())) + 'px'
	}
	var t = Paper.text(pos.x, pos.y, node.text);
	t.attr({ 'font-size': '18px' });
	var width = t.getBBox().width;
	
	if(width > 200)
	width = Math.pow(width, 0.7);
	
	
	textWrap(t, width);
	t.attr({ 'text-anchor': 'start' });
	var box = t.getBBox();
	var rect = Paper.rect(box.x - 10, box.y - 10, box.width + 20, box.height + 20);
	rect.attr({ 'fill': 'rgba(255,255,255,0.8)' });
	rect.insertBefore(t);
	rect.attr({ 'border-top': '20px solid #009933' });
	
	rect.hide();
	t.hide();
	var set = Paper.set();
	set.push(rect);
	set.push(t);
	
	node.svg = { text: t, rect: rect };
	
	set.drag(
	function(x, y, ax, ay, e) { dragMove(x, y, ax, ay, e, set); }, 
	function(x, y, e) { dragStart(x, y, e); } , 
	function(x, y, e) { dragEnd(e); }
	);
	
	function dragStart(x, y, e) {
		draggedElementOriginalPos = { x: parseInt(node.svg.rect.attrs.x), y: parseInt(node.svg.rect.attrs.y) };
	}
	
	function dragMove(x, y, ax, ay, e, set) {
		var scale = $(Paper.canvas).svgNavigation('scale');
		set.forEach(function(e) {
			var newX = draggedElementOriginalPos.x + x * scale;
			var newY = draggedElementOriginalPos.y + y * scale;
			
			if(isNumber(newX) && isNumber(newY)) {
				if(e.type == 'rect') { e.attr({ 'x': newX, 'y': newY }); }
				if(e.type == 'text') { 
					var box = e.getBBox();
					e.attr({ 'x': newX + 10, 'y': newY + 10 + box.height/2 }); 
				}
			}
		});
	}
	
	function dragEnd(e) {
	}
	
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	set.show();
}