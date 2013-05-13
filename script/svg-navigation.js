;(function ( $, window, document, undefined ) {
  

    // Create the defaults once
    var pluginName = 'svgNavigation',
        defaults = {
            paper: false,
			backgroundDragOnly: true
        };
		
	

    // The actual plugin constructor
    function Plugin( element, options) {
		
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init(this.options, element);
    }

	var mousedown = false;
	var mousePos = false;
	var ViewPort;
	var scale = 1;
	
    Plugin.prototype.init = function (O, element) {
		
		
		ViewPort = O.paper.setViewBox(0, 0, O.paper.width, O.paper.height);
		ViewPort.X = 0;
		ViewPort.Y = 0;
		
		var OriginalViewPort = { X: ViewPort.X, Y: ViewPort.Y, width: ViewPort.width, height: ViewPort.height };
		
		// Mouse-events
		$(element).
		mousedown(function(e) { if(!O.backgroundDragOnly || e.target.nodeName == 'svg') { mousedown = true; } }).
		mousemove(function(e) { 
			if(mousedown) { 
				Pan(e.pageX - mousePos.x, e.pageY - mousePos.y);
			} 
			mousePos = { x: e.pageX, y: e.pageY };
		}).
		mouseup(function(e) { mousedown = false; }).
		mouseleave(function(e) { mousedown = false; });
		
		if($(element).mousewheel) {
			$(element).mousewheel(function(e, delta) {
				e.preventDefault(); 
				Zoom(scale - delta/8);
			});
		}
		
		function Pan(x, y) {
			ViewPort.X -= x * scale;
			ViewPort.Y -= y * scale;
			O.paper.setViewBox(ViewPort.X, ViewPort.Y, ViewPort.width, ViewPort.height);
		}
		
		function Zoom(z) {
			console.log(scale);
			scale = z;
			
			console.log(scale);
			if(scale > 2.375)
				scale = 2.375;
			if(scale < 0.2)
				scale = 0.2;
			
			ViewPort.X -= (OriginalViewPort.width * scale - ViewPort.width) / 2;
			ViewPort.Y -= (OriginalViewPort.height * scale - ViewPort.height) / 2;
			
			ViewPort.width = scale * OriginalViewPort.width;
			ViewPort.height = scale * OriginalViewPort.height;
			
			O.paper.setViewBox(ViewPort.X, ViewPort.Y, ViewPort.width, ViewPort.height);
			
		}
    };
	
	function getScale() {
		return scale;
	}
	

/*
	function panClick() {
		var movement = new Vector(0, 0);
		if(NavigationButtons.Left)
		movement.Add(new Vector(20, 0));
		if(NavigationButtons.Right)
		movement.Add(new Vector(-20, 0));
		if(NavigationButtons.Up)
		movement.Add(new Vector(0, 20));
		if(NavigationButtons.Down)
		movement.Add(new Vector(0, -20));
		
		Pan(movement.X, movement.Y);
	}

	function ResetCanvasPosition() {
		var x = -(OriginalViewPort.width * scale - OriginalViewPort.width) / 2;
		var y = -(OriginalViewPort.height * scale - OriginalViewPort.height) / 2;
		
		function anim() {
			ViewPort.X = ViewPort.X - (ViewPort.X - x) * 0.5;
			ViewPort.Y = ViewPort.Y - (ViewPort.Y - y) * 0.5;
			Canvas.setViewBox(ViewPort.X, ViewPort.Y, ViewPort.width, ViewPort.height);
			
			if(Math.abs(ViewPort.X - x) < 10) {
				ViewPort.X = x;
				ViewPort.Y = y;
			}
			else
			setTimeout(anim, 16);
		}
		setTimeout(anim, 16);
	}

	function MoveCanvas() {
		panMovement.Multiply(0.85);
		Pan(panMovement.X, panMovement.Y);
		
		if(panMovement.LengthSquared() > 10 && !mouseDown)
		setTimeout(MoveCanvas, 16);
	}

	function Zoom(z) {
		scale = z;
		
		if(scale < 0.25) {
			scale = 0.25;
		}
		if(scale > 4) {
			scale = 4;
		}
		
		ViewPort.X -= (OriginalViewPort.width * scale - ViewPort.width) / 2;
		ViewPort.Y -= (OriginalViewPort.height * scale - ViewPort.height) / 2;
		
		ViewPort.width = scale * OriginalViewPort.width;
		ViewPort.height = scale * OriginalViewPort.height;
		
		Canvas.setViewBox(ViewPort.X, ViewPort.Y, ViewPort.width, ViewPort.height);
		
	}

	 */
	// A really lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options, args ) {
		
		if(options && typeof(options) == 'string') {
			switch(options) {
				case 'scale': return getScale();
			}
		}
		
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, 
				new Plugin( this, options ));
			}
		});
	}
	

})( jQuery, window, document );