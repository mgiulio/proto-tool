var
	dos = require('./design-objects/design-objects')
;

var 
	AppDispatcher = require('../dispatcher/AppDispatcher')
	,appConstants = require('../constants/appConstants')
;

AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case appConstants.ADD_OBJECT:
			dos.addObject(action.type, action.x, action.y, action.w, action.h, action.rest);
			designObjectStore.emitChange();
			break;
		case appConstants.SELECT_OBJECT:
			dos.select(action.index);
			designObjectStore.emitChange();
			break;
		break;
		case appConstants.SELECT_NEXT:
			dos.selectNext();
			designObjectStore.emitChange();
			break;
		case appConstants.SELECT_PREV:
			dos.selectPrev();
			designObjectStore.emitChange();
			break;
		case appConstants.SET_POSITION:
			dos.setPosition(action.x, action.y);
			designObjectStore.emitChange();
			break;
		case appConstants.TRANSLATE:
			dos.translate(action.dx, action.dy);
			designObjectStore.emitChange();
			break;
		case appConstants.RESIZE_SIDE:
			dos.resizeSide(action.side, action.amount);
			designObjectStore.emitChange();
			break;
		case appConstants.SET_WIDTH:
			dos.setWidth(action.w);
			designObjectStore.emitChange();
			break;
		case appConstants.SET_HEIGHT:
			dos.setHeight(action.h);
			designObjectStore.emitChange();
			break;
		case appConstants.SET_CANVAS_WIDTH:
			dos.setCanvasWidth(action.w);
			designObjectStore.emitChange();
			break;
		case appConstants.SET_CANVAS_HEIGHT:
			dos.setCanvasHeight(action.h);
			designObjectStore.emitChange();
			break;
		default:
	}
});
		
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
	
	getObjects: dos.getObjects.bind(dos),
	getSelectedObject: dos.getSelectedObject.bind(dos),
	getCanvasSize: dos.getCanvasSize.bind(dos)
  
});

module.exports = designObjectStore;