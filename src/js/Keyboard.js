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
		
		/*
		var
			amount = 10,
			multiplier = 10
		;
		*/
		
		/*
		if (e.shiftKey)
			amount *= multiplier;
		else if (e.ctrlKey)
			amount /= multiplier;
		*/
		
		switch (e.keyIdentifier) {
			case 'Up':
				this.props.on.translateUp();
				break;
			case 'Right':
				this.props.on.translateRight();
				break;
			case 'Down':
				this.props.on.translateDown();
				break;
			case 'Left':
				this.props.on.translateLeft();
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