var
   React = require('react')
   ,AppController = require('./components/AppController')
   ,appActions = require('./actions/AppActions')
   //,appConstants = require('./constants/appConstants')
   ,designObjectStore = require('./stores/designObjectStore')
;

window.appActions = appActions;
//window.appConstants = appConstants;

React.render(<AppController />, document.body, populate);

function populate() {
	/*
	var r0 = api.addObject('Rectangle', 10, 10, 100, 50);
	var r1 = api.addObject('Rectangle', 100, 100, 50, 100);
	api.select(r0);
	api.setPos(300, 300);
	api.select(r1);
	api.translate(100, 0);
	*/
	
	/*
	appActions.addObject('Rectangle', 10, 10, 100, 50);
	var r0 = designObjectStore.getSelectedObject();
	appActions.addObject('Rectangle', 10, 100, 50, 100);
	appActions\.select(r0);
	//...
	*/
	
	appActions.addObject('Rectangle', 10, 10, 100, 50);
	appActions.addObject('Rectangle', 120, 10, 100, 50);
	appActions.addObject('Rectangle', 230, 10, 100, 50);
}
