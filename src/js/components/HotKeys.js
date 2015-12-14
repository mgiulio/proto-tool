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
		//console.log(e.which);
		
		var xy;
		
		var speed;
		if (e.shiftKey)
			speed = 'fast';
		else if (e.ctrlKey)
			speed = 'slow';
		else
			speed = 'normal';
		
		switch (e.which) {
			case 38: // up
				AppActions.translateUp(speed);
				e.stopPropagation();
				e.preventDefault();
				break;
			case 39: // right
				AppActions.translateRight(speed);
				e.stopPropagation();
				e.preventDefault();
				break;
			case 40: // down
				AppActions.translateDown(speed);
				e.stopPropagation();
				e.preventDefault();
				break;
			case 37: // left
				AppActions.translateLeft(speed);
				e.stopPropagation();
				e.preventDefault();
				break;
			case 82: // 'r'
				xy = this.getClickPointCanvasSpace();
				if (xy !== null) {
					AppActions.addObject('Rectangle', xy[0], xy[1], 100, 50);
					e.stopPropagation();
					e.preventDefault();
				}
				break;
			case 66: // 'b'
				xy = this.getClickPointCanvasSpace();
				if (xy !== null) {
					AppActions.addObject('Browser', xy[0], xy[1], 600, 300);
					e.stopPropagation();
					e.preventDefault();
				}
				break;
			case 80: // 'p'
				xy = this.getClickPointCanvasSpace();
				if (xy !== null) {
					AppActions.addObject('Picture', xy[0], xy[1], 70, 70);
					e.stopPropagation();
					e.preventDefault();
				}
				break;
			case 46: // CANC
				appActions.removeObject();
				e.stopPropagation();
				e.preventDefault();
				break;
			case 65: // 'a'
				if (e.ctrlKey) {
					appActions.selection.all();
					
					e.stopPropagation();
					e.preventDefault();
				}
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