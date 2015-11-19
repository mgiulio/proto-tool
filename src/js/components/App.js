var
   React = require('react')
	,doStore = require('../stores/designObjectStore')
	,KeyboardInput = require('./KeyboardInput')
   ,Canvas = require('./Canvas')
   ,doRender = require('../doRender')
;

var App = React.createClass({
	
	getAppState: function() {
		return {
			designObjects: doStore.getObjects()
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
		var designObjectsRep = this.state.designObjects.map(doRender);
		
		return (
			<div className="app">
				<Canvas>
					{designObjectsRep}
				</Canvas>
				<KeyboardInput />
			</div>
		);
	}
	
});

module.exports = App;