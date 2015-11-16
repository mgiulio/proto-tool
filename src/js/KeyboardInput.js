var
   React = require('react')
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
		
		console.log(e.keyIdentifier);
		console.log(e);
		
		var speed;
		if (e.shiftKey)
			speed = 'fast';
		else if (e.ctrlKey)
			speed = 'slow';
		else
			speed = 'normal';
		
		switch (e.keyIdentifier) {
			case 'Up':
				this.props.on.translateUp(speed);
				break;
			case 'Right':
				this.props.on.translateRight(speed);
				break;
			case 'Down':
				this.props.on.translateDown(speed);
				break;
			case 'Left':
				this.props.on.translateLeft(speed);
				break;
			case 'U+0009':
				if (e.shiftKey)
					this.props.on.selectPrev();
				else
					this.props.on.selectNext();
				e.preventDefault();
				break;
			case 'U+0041': // a
				this.props.on.addObject();
				break;
		}
	}

});

module.exports = Keyboard;