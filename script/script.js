(function($) {
	 var WindowHeight;
	 var keyDownTimeout;
	$(function() {
		WindowHeight = $(window).height();
		
		$('#text').height(WindowHeight - 100).val(getSave()).blur(Save).keydown(KeyDown);
		$('#send').mousedown(function(e) { SendSelectedText(); e.preventDefault();  });
		$('body').mouseup(textSelection);
	});
	
	function SendSelectedText() {
		var ta = document.getElementById('text');
		var string = ta.value.substring(ta.selectionStart, ta.selectionEnd);
		
		if(string.length > 0)
			Send(string);
		else
			message('Please highlight the text you want to send');
	}
	
	function Send(text) {
		$.post('send.php', { text:text, room: Room }, function(response) {
				console.log('PHP: ' + response);
				if(response == '1') 	
					message('Sending text succeeded!');
				else
					message('Sending text failed.');
			var div = $('<div>').html(text);
			div.addClass('list-node');
			$('body').append(div);
			div.css({ position: 'absolute', margin: 'auto', marginTop: '50%', width: '50%', left: '25%', 'backgroundColor': '#fff', 'padding': '10px'});
			div.animate({ top: '-100%' }, 1000); 
		});
	}
	
	function message(e) {
		alert(e);
	}
	
	function KeyDown() {
		if(keyDownTimeout)
			clearTimeout(keyDownTimeout);
		keyDownTimeout = setTimeout(Save, 2000);
	}
	
	function Save() {
		var data = JSON.parse(localStorage.square1text);
		data[Room] = $('#text').val();
		localStorage.square1text = JSON.stringify(data);
		var d = new Date();
		$('#save-note').text('Saved: ' + zeronify(d.getHours()) + ':' + zeronify(d.getMinutes()) + ':' + zeronify(d.getSeconds()));
	}
	
	function getSave() {
		if(!localStorage.square1text) { localStorage.square1text = JSON.stringify({ }); }
		var storage = JSON.parse(localStorage.square1text);
		return storage[Room];
	}

	function textSelection(e) {
		if(window.getSelection()) {
			var sel = window.getSelection();
			if(sel.anchorNode && $(sel.anchorNode.parentElement).attr('id') == 'text' && sel.anchorNode.data) {
				var string = sel.anchorNode.data.substring(sel.extentOffset, sel.baseOffset); 
				if(string != '') {
					console.log(string);
				}
			}
		}
	}
	
	function zeronify(n) {
		if(n < 10)
			return '0' + n;
		return n;
	}
})($);