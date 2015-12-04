var
   React = require('react')
   ,sidePanelStore = require('../stores/sidePanelStore')
   ,appActions = require('../actions/AppActions')
;

var AppBar = React.createClass({
	
	render: function() {
		return (
			<div className="appbar">
				<h1 className="appbar__logo">Pr</h1>
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
			<div className="appbar__panel-buttons">
				<TwoStateButton className="appbar__panel-buttons__inspector" icon="tune" state={this.state.isInspectorVisible ? 'down' : 'up'} onClick={appActions.toggleInspector} />
				<TwoStateButton className="appbar__panel-buttons__settings" icon="cog" state={this.state.isSettingsVisible ? 'down' : 'up'} onClick={appActions.toggleSettings} />
			</div>
		);
	}

});

var Icon = require('./Icon');

var TwoStateButton = React.createClass({

	render: function() {
		var
			classes = ['twostatebutton']
		;
		if (this.props.className)
			classes.push(this.props.className);
		classes.push(this.props.state);
		
		return (
			<button className={classes.join(' ')} onClick={this.props.onClick}>
				<Icon which={this.props.icon} />
			</button>
		);
	}

});

module.exports = AppBar;