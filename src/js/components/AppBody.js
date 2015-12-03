var
	React = require('react')
	,sidePanelStore = require('../stores/sidePanelStore')
	,CanvasViewport = require('./CanvasViewport')
	,SidePanelContainer = require('./SidePanelContainer')
;

var AppBody = React.createClass({
	
	getInitialState: function() {
		return {
			isSidePanelVisible: sidePanelStore.isSidePanelVisible()
		};
	},
	
	componentDidMount: function() {
		sidePanelStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		sidePanelStore.removeChangeListener(this._onChange);
	},
	
	_onChange: function() {
		this.setState({
			isSidePanelVisible: sidePanelStore.isSidePanelVisible()
		});
	},
	
	render: function() {
		var classes = ['app-body'];
		if (this.state.isSidePanelVisible)
			classes.push('sidepanel-visible');
		
		return (
			<div className={classes.join(' ')}>
				<CanvasViewport />
				<SidePanelContainer />
			</div>
		);
	}
	
});

module.exports = AppBody;