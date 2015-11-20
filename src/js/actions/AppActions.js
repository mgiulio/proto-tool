var 
	AppDispatcher = require('../dispatcher/AppDispatcher')
	,AppConstants = require('../constants/AppConstants')
	,compose = require('../lib/func').compose
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

function neg(x) {
	return - x;
}

function translate(dx, dy) {
	AppDispatcher.dispatch({
		actionType: AppConstants.TRANSLATE,
		dx: dx,
		dy: dy
	});
}
	
/*
translateUp: function(speed) {
	this.translate(0,  - offset(speed));
},
*/


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
	
	translate: translate,
	translateUp: compose(translate.bind(null, 0), neg, offset),
	translateDown: compose(translate.bind(null, 0), offset),
	translateRight: function(speed) { //translateRight: compose(translate.bind(null, _, 0), offset),
		translate(offset(speed), 0);
	},
	translateLeft: function(speed) {
		translate(- offset(speed), 0);
	},
	
	pullSide: function(side, amount) {
		AppDispatcher.dispatch({
			actionType: AppConstants.PULL_SIDE,
			side: side,
			amount: amount
		});
	}

};

module.exports = AppActions;
