var
	React = require('react')
	,sidePanelStore = require('../stores/sidePanelStore')
	,CanvasViewport = require('./CanvasViewport')
	,SidePanelContainer = require('./SidePanelContainer')
;

var AppBody = React.createClass({
	
	getInitialState: function() {
		return {
			sidePanelState: sidePanelStore.isSidePanelVisible() ? 'OPEN' : 'CLOSED'
		};
	},
	
	componentDidMount: function() {
		sidePanelStore.addChangeListener(this._onChange);
		
		this.getDOMNode().addEventListener('transitionend', this.onTransitionEnd);
	},
	
	componentWillUnmount: function() {
		sidePanelStore.removeChangeListener(this._onChange);
		
		this.getDOMNode().removeEventListener('transitionend', this.onTransitionEnd);
	},
	
	onTransitionEnd: function(e) {
		if (e.target.classList.contains('canvas-viewport')) {
			e.stopPropagation();
			
			if (this.state.sidePanelState === 'OPENING')
				this.setState({sidePanelState: 'OPEN'});
			if (this.state.sidePanelState === 'CLOSING')
				this.setState({sidePanelState: 'CLOSED'});
		}
	},
	
	_onChange: function() {
		var newState = this.state.sidePanelState;
		
		if (this.state.sidePanelState === 'CLOSED' && sidePanelStore.isSidePanelVisible()) {
			newState = 'OPENING';
			
			this.panel = this.getVisiblePanel();
		}
		else if (this.state.sidePanelState === 'OPEN')
			if (!sidePanelStore.isSidePanelVisible())
				newState = 'CLOSING';
			else {
				this.panel = this.getVisiblePanel();
				this.forceUpdate();
			}
		
		if (newState != this.state.sidePanelState)
			this.setState({sidePanelState: newState});
	},
	
	getVisiblePanel: function() {
		if (sidePanelStore.isInspectorVisible())
			return 'INSPECTOR';
		else if (sidePanelStore.isSettingsVisible())
			return 'SETTINGS';
	},
	
	render: function() {
		var 
			classes = ['app-body']
			,sidePanel
		;
		
		switch (this.state.sidePanelState) {
			case 'CLOSED':
				break;
			case 'OPENING':
				classes.push('sidepanel-visible');
				sidePanel = <SidePanelContainer panel={this.panel} />
				break;
			case 'OPEN':
				classes.push('sidepanel-visible');
				sidePanel = <SidePanelContainer panel={this.panel} />
				break;
			case 'CLOSING':
				sidePanel = <SidePanelContainer panel={this.panel} />
				break;
		}
		
		return (
			<div className={classes.join(' ')}>
				<CanvasViewport />
				{sidePanel}
			</div>
		);
	}
	
});

module.exports = AppBody;