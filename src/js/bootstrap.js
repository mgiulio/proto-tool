var
   React = require('react')
   ,AppController = require('./components/AppController')
   ,AppActions = require('./actions/AppActions')
   ,designObjectStore = require('./stores/designObjectStore')
;

React.render(<AppController />, document.body/*, populate*/);

function populate() {
	/*
	var r0 = api.addObject('Rectangle', 10, 10, 100, 50);
	var r1 = api.addObject('Rectangle', 100, 100, 50, 100);
	api.select(r0);
	api.setPos(300, 300);
	api.select(r1);
	api.translate(100, 0);
	*/
	
	AppActions.addObject('Rectangle', 10, 10, 100, 50);
	var r0 = designObjectStore.getSelectedObject();
	AppActions.addObject('Rectangle', 10, 100, 50, 100);
	AppActions.select(r0);
	//...
}
