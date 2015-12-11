var
	React = require('react')
	,AppActions = require('../actions/AppActions')
	,mousePosClient = [null, null]
	,cvp = null
;

var Keyboard = React.createClass({
	
	render: function() {
		return null;
	},
	
	componentDidMount: function() {
		document.addEventListener('keydown', this.onKeydown, false);
		
		document.addEventListener('mousemove', this.onMouseMove, false);
		cvp = document.querySelector('.canvas-viewport');
	},
	
	componentWillUnmount: function() {
		document.removeEventListener('keydown', this.onKeydown, false);
		document.removeEventListener('mousemove', this.onMouseMove, false);
	},
	
	onMouseMove: function(e) {
		e.stopPropagation();
		
		mousePosClient[0] = e.clientX;
		mousePosClient[1] = e.clientY;
	},
	
	onKeydown: function(e) {
		//e.stopPropagation();
		//e.preventDefault();
		
		var xy;
		
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
				xy = this.getClickPointCanvasSpace();
				if (xy !== null)
					//AppActions.addObject('Rectangle', ...(this.getMouseClientPos().concat([100, 50])))
				AppActions.addObject('Rectangle', xy[0], xy[1], 100, 50);
				break;
			case 66: // 'b'
				//AppActions.addObject('Browser', ...(this.getMouseClientPos().concat([600, 300])))
				xy = this.getClickPointCanvasSpace();
				if (xy !== null)
					AppActions.addObject('Browser', xy[0], xy[1], 600, 300);
				break;
			case 46:
				appActions.removeObject();
				break;
			default:
		}
	},
	
	getClickPointCanvasSpace: function() {
		var
			p = null,
			cvpcr = cvp.getBoundingClientRect()
		;
		
		if (
			cvpcr.left <= mousePosClient[0] && mousePosClient[0] <= cvpcr.right &&
			cvpcr.top <= mousePosClient[1] && mousePosClient[1] <= cvpcr.bottom
		) {
			var
				xcvp = mousePosClient[0] - cvpcr.left,
				ycvp = mousePosClient[1] - cvpcr.top
			;
			p = [xcvp + cvp.scrollLeft, ycvp + cvp.scrollTop];
		}
		
		return p;
	}
	
});

module.exports = Keyboard;