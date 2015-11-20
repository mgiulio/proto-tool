var
   React = require('react')
	,doStore = require('../stores/designObjectStore')
   ,doRender = require('../doRender')
   ,App = require('./App')
;

var AppController = React.createClass({
	
	getAppState: function() {
		return {
			designObjects: doStore.getObjects(),
			selectedObject: doStore.getSelectedObject()
		};
	},
	
	getInitialState: function() {
		return this.getAppState();
	},
	
	componentDidMount: function() {
		doStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		doStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState(this.getAppState());
	},
	
	render: function() {
		return (
			<App 
				designObjects={this.state.designObjects} 
				selectedObject={this.state.selectedObject}
				doRender={doRender} 
			/>
		);
	}
	
});

module.exports = AppController;