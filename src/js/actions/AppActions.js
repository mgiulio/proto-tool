var 
	AppDispatcher = require('../dispatcher/AppDispatcher')
	,appConstants = require('../constants/appConstants')
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
		actionType: appConstants.TRANSLATE,
		dx: dx,
		dy: dy
	});
}

function resizeSide(side, amount) {
	AppDispatcher.dispatch({
		actionType: appConstants.RESIZE_SIDE,
		side: side,
		amount: amount
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
			actionType: appConstants.ADD_OBJECT,
			type: type,
			x: x,
			y: y,
			w: w,
			h: h
		});
	},
	
	selectObject: function(i) {
		AppDispatcher.dispatch({
			actionType: appConstants.SELECT_OBJECT,
			index: i
		});
	},
	
	selectNext: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.SELECT_NEXT
		});
	},
	
	selectPrev: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.SELECT_PREV
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
	
	setPosition: function(x, y) {
		AppDispatcher.dispatch({
			actionType: appConstants.SET_POSITION,
			x: x,
			y: y
		});
	},
	
	resizeSide: resizeSide,
	resizeTop: resizeSide.bind(null, appConstants.TOP),
	resizeRight: resizeSide.bind(null, appConstants.RIGHT),
	resizeBottom: resizeSide.bind(null, appConstants.BOTTOM),
	resizeLeft: resizeSide.bind(null, appConstants.LEFT),
	
	showInspector: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.SHOW_INSPECTOR
		});
	},
	
	hideInspector: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.HIDE_INSPECTOR
		});
	},
	
	toggleInspector: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.TOGGLE_INSPECTOR
		});
	},
	
	showSettings: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.SHOW_SETTINGS
		});
	},
	
	hideSettings: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.HIDE_SETTINGS
		});
	},
	
	toggleSettings: function() {
		AppDispatcher.dispatch({
			actionType: appConstants.TOGGLE_SETTINGS
		});
	},

};

module.exports = AppActions;
