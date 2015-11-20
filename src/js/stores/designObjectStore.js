var
	objects = [],
	selected = null,
	Rectangle = require('./Rectangle'),
	designObjects = {
		'Rectangle': Rectangle
	}
;
		
function addObject(type, x, y, w, h) {
	var o = new designObjects[type](x, y, w, h); 
	
	objects.push(o);
	selected = objects.length - 1;
}
	
function select(i) {
	selected = i;
}
	
function selectNext() {
	selected = (selected + 1) % objects.length;
}

function selectPrev() {
	selected--;
	if (selected < 0)
		selected = objects.length - 1;
}
	
function setPos(x, y) {
	objects[selected].setPos(x, y);
}

function translate(x, y) {
	objects[selected].translate(x, y);
}

function resizeSide(side, amount) {
	objects[selected].resizeSide(side, amount);
}



var 
	EventEmitter = require('events').EventEmitter,
	CHANGE_EVENT = 'change',
	assign = require('object-assign');
;

var designObjectStore = assign({}, EventEmitter.prototype, {
	
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	
	getObjects: function() {
		return objects;
	},
	
	getSelectedObject: function() {
		return objects[selected];
	}
  
});

var 
	AppDispatcher = require('../dispatcher/AppDispatcher')
	,appConstants = require('../constants/appConstants')
;

AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case appConstants.ADD_OBJECT:
			addObject(action.type, action.x, action.y, action.w, action.h);
			designObjectStore.emitChange();
			break;
		case appConstants.SELECT_OBJECT:
			select(action.index);
			designObjectStore.emitChange();
			break;
		break;
		case appConstants.SELECT_NEXT:
			selectNext();
			designObjectStore.emitChange();
			break;
		case appConstants.SELECT_PREV:
			selectPrev();
			designObjectStore.emitChange();
			break;
		case appConstants.TRANSLATE:
			translate(action.dx, action.dy);
			designObjectStore.emitChange();
			break;
		case appConstants.RESIZE_SIDE:
			resizeSide(action.side, action.amount);
			designObjectStore.emitChange();
			break;
		default:
	}
});

module.exports = designObjectStore;