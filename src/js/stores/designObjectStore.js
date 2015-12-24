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
		case appConstants.REMOVE_OBJECT:
		dos.removeObject();
		designObjectStore.emitChange();
		break;
		
		case appConstants.SELECTION_SELECT:
			dos.selection.select(action.index);
			designObjectStore.emitChange();
			break;
		case appConstants.SELECTION_TOGGLE:
			dos.selection.toggle(action.index);
			designObjectStore.emitChange();
			break;
		break;
		case appConstants.SELECTION_ALL:
			dos.selection.all();
			designObjectStore.emitChange();
			break;
		break;
		case appConstants.SELECTION_INVERT:
			dos.selection.invert();
			designObjectStore.emitChange();
			break;
		break;
		case appConstants.SELECTION_CLEAR:
			dos.selection.clear();
			designObjectStore.emitChange();
			break;
		break;
		case appConstants.SELECTION_IN_RECT:
			dos.selection.inRect(action.start, action.end);
			designObjectStore.emitChange();
			break;
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
		case appConstants.MOVE_UP:
			dos.moveUp();
			designObjectStore.emitChange();
			break;
		case appConstants.MOVE_DOWN:
			dos.moveDown();
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
	getSelectionSet: dos.selection.get.bind(dos),
	getCanvasSize: dos.getCanvasSize.bind(dos)
  
});

module.exports = designObjectStore;