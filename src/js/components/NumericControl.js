var
   React = require('react')
   ,ENTER_KEY_CODE = 13
;

var NumericControl = React.createClass({
	
	getInitialState: function() {
		return { value: this.props.value || null };
	},
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({value: nextProps.value || null});
	},
	
	render: function() {
		return (
			<input 
				type="text" 
				value={this.state.value === null ? '' : String(this.state.value)} 
				onChange={this.onChange} 
				onKeyDown={this.onKeyDown}
			/>
		);
	},
	
	onChange: function(e) {
		e.stopPropagation();
		
		var 
			npv = e.target.value // newProposedValue
		;
		
		this.setState({value: npv === '' ? null: parseInt(npv)});
	},
	
	onKeyDown: function(e) {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		
		if (e.keyCode === ENTER_KEY_CODE)
			this.props.onChange(this.state.value);
	}
	
});

module.exports = NumericControl;