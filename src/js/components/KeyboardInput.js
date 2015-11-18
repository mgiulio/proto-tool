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
	
	onKeydown: function(e) {
		//e.stopPropagation();
		//e.preventDefault();
		
		//console.log(e.keyIdentifier);
		//console.log(e);
		
		var speed;
		if (e.shiftKey)
			speed = 'fast';
		else if (e.ctrlKey)
			speed = 'slow';
		else
			speed = 'normal';
		
		switch (e.keyIdentifier) {
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
			case 'U+0041': // a
				AppActions.addObject('Rectangle', ...(this.getMouseClientPos().concat([100, 50])))
				break;
		}
	},
	
	getMouseClientPos: function() {
		return [800, 250];
	}
	
});

module.exports = Keyboard;