var
   React = require('react')
;

var Inspector = React.createClass({
	
	getInitialState: function() {
		return this.getObjectInfo(this.props.selectedObject);
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState(this.getObjectInfo(nextProps.selectedObject));
	},
	
	getObjectInfo: function(o) {
		return {
			x: o.x
		};
	},
	
	render: function() {
		var 
			so = this.props.selectedObject,
			content
		;
		
		if (!so)
			content = <p>no selected object</p>;
		else {
			content = 
				<form onSubmit={this.onSubmit} >
					<input type="text" value={this.state.x} onChange={this.onChangeX} />
				</form>
			;
		}
		
		return (
			<div className="inspector">
				{content}
			</div>
		);
	},
	
	onChangeX: function(e) {
		e.stopPropagation();
		
		this.setState({x: e.target.value});
	},
	
	onSubmit: function(e) {
		e.stopPropagation();
		e.preventDefault();
		
		appActions.setPosition(this.state.x, this.props.selectedObject.y);
	}

});

module.exports = Inspector;