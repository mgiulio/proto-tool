var 
	AppDispatcher = require('../dispatcher/AppDispatcher')
	,AppConstants = require('../constants/AppConstants')
;

function offset(speed) {
	var 
		d = 10,
		speeds = {
			'slow': 0.1,
			'normal': 1,
			'fast': 10
		};
	
	return d * speeds[speed];
}

var AppActions = {
	
	addObject: function(type, x, y, w, h) {
		AppDispatcher.dispatch({
			actionType: AppConstants.ADD_OBJECT,
			type: type,
			x: x,
			y: y,
			w: w,
			h: h
		});
	},
	
	selectObject: function(i) {
		AppDispatcher.dispatch({
			actionType: AppConstants.SELECT_OBJECT,
			index: i
		});
	},
	
	selectNext: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.SELECT_NEXT
		});
	},
	
	selectPrev: function() {
		AppDispatcher.dispatch({
			actionType: AppConstants.SELECT_PREV
		});
	},
	
	translate: function(dx, dy) {
		AppDispatcher.dispatch({
			actionType: AppConstants.TRANSLATE,
			dx: dx,
			dy: dy
		});
	},
	
	translateUp: function(speed) {
		this.translate(0,  - offset(speed));
	},
	
	translateDown: function(speed) {
		this.translate(0,  offset(speed));
	},
	
	translateRight: function(speed) {
		this.translate(offset(speed), 0);
	},
	
	translateLeft: function(speed) {
		this.translate(- offset(speed), 0);
	}

};

module.exports = AppActions;
