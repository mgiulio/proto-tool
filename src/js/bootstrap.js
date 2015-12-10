var
   React = require('react')
   ,appActions = require('./actions/AppActions')
   //,appConstants = require('./constants/appConstants')
   ,designObjectStore = require('./stores/designObjectStore')
   ,App = require('./components/App')
;

window.appActions = appActions;
//window.appConstants = appConstants;

React.render(<App />, document.body/*, populate*/);

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
