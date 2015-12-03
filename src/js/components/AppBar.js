var
   React = require('react')
   ,sidePanelStore = require('../stores/sidePanelStore')
   ,appActions = require('../actions/AppActions')
;

var AppBar = React.createClass({
	
	render: function() {
		return (
			<div className="app-bar">
				<h1 className="logo">Bc</h1>
				
				<a className="about" href="#">About</a>
				
				<SidePanelButtons />
			</div>
		);
	}
	
});

var SidePanelButtons = React.createClass({
	
	getInitialState: function() {
		return {
			isInspectorVisible: sidePanelStore.isInspectorVisible(),
			isSettingsVisible: sidePanelStore.isSettingsVisible()
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
			isInspectorVisible: sidePanelStore.isInspectorVisible(),
			isSettingsVisible: sidePanelStore.isSettingsVisible()
		});
	},

	render: function() {
		return (
			<div className="panels">
				<TwoStateButton icon="inspector" state={this.state.isInspectorVisible ? 'down' : 'up'} onClick={appActions.toggleInspector} />
				<TwoStateButton icon="settings" state={this.state.isSettingsVisible ? 'down' : 'up'} onClick={appActions.toggleSettings} />
			</div>
		);
	}

});

var TwoStateButton = React.createClass({

	render: function() {
		return (
			<button onClick={this.props.onClick}>{`${this.props.icon} ${this.props.state}`}</button>
		);
	}

});

module.exports = AppBar;