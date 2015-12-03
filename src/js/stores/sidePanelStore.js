var
	activePanel = null // with the following values: null, 'inspector', 'settings'
;

var 
	AppDispatcher = require('../dispatcher/AppDispatcher')
	,appConstants = require('../constants/appConstants')
;

AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case appConstants.TOGGLE_INSPECTOR:
			activePanel = activePanel === null || activePanel === 'SETTINGS' ? 'INSPECTOR' : null;
			store.emitChange();
			break;
		case appConstants.TOGGLE_SETTINGS:
			activePanel = activePanel === null || activePanel === 'INSPECTOR' ? 'SETTINGS' : null;
			store.emitChange();
			break;
		case appConstants.SHOW_INSPECTOR:
			if (activePanel !== 'INSPECTOR') {
				activePanel = 'INSPECTOR';
				store.emitChange();
			}
			break;
		case appConstants.SHOW_SETTINGS:
			if (activePanel !== 'SETTINGS') {
				activePanel = 'SETTINGS';
				store.emitChange();
			}
			break;
		case appConstants.CLOSE_PANEL:
			if (activePanel !== null) {
				activePanel = null;
				store.emitChange();
			}
			break;
		case appConstants.HIDE_INSPECTOR:
			if (activePanel === 'INSPECTOR') {
				activePanel = null;
				store.emitChange();
			}
			break;
		case appConstants.HIDE_SETTINGS:
			if (activePanel === 'SETTINGS') {
				activePanel = null;
				store.emitChange();
			}
			break;
		default:
	}
});
		
var 
	EventEmitter = require('events').EventEmitter,
	CHANGE_EVENT = 'change',
	assign = require('object-assign');
;

var store = assign({}, EventEmitter.prototype, {
	
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},
	
	isSidePanelVisible: function() {
		return activePanel !== null;
	},
	
	isInspectorVisible: function() {
		return activePanel === 'INSPECTOR';
	},
	
	isSettingsVisible: function() {
		return activePanel === 'SETTINGS';
	}
  
});

module.exports = store;