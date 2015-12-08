var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var Keyboard = React.createClass({
	
	render: function() {
		return null;
	},
	
	componentDidMount: function() {
		document.addEventListener('keydown', this.onKeydown, false);
	},
	
	componentWillMount: function() {
		document.removeEventListener('keydown', this.onKeydown, false);
	},
	
	onKeydown: function(e) {
		//e.stopPropagation();
		//e.preventDefault();
		
		var speed;
		if (e.shiftKey)
			speed = 'fast';
		else if (e.ctrlKey)
			speed = 'slow';
		else
			speed = 'normal';
		
		switch (/*e.keyIdentifier*/e.which) {
			case 'Up':
				AppActions.translateUp(speed);
				break;
			case 'Right':
				AppActions.translateRight(speed);
				break;
			case 'Down':
				AppActions.translateDown(speed);
				break;
			case 'Left':
				AppActions.translateLeft(speed);
				break;
			case 'U+0009':
				if (e.shiftKey)
					AppActions.selectNext();
				else
					AppActions.selectPrev();
				e.preventDefault();
				break;
			case 82: // 'r', was 'a'('U+0041')
				AppActions.addObject('Rectangle', ...(this.getMouseClientPos().concat([100, 50])))
				break;
			case 66: // 'b'
				AppActions.addObject('Browser', ...(this.getMouseClientPos().concat([600, 300, 'ILGI'])))
				break;
		}
	},
	
	getMouseClientPos: function() {
		return [800, 250];
	}
	
});

module.exports = Keyboard;