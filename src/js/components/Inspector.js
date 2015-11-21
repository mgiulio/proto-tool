var
   React = require('react')
;

var Inspector = React.createClass({
	
	render: function() {
		var content;
		
		if (this.props.selectedObject)
			content = <div>there is a selected object</div>;
		else
			content = <div>no selected object</div>;
		
		return (
			<div>
				{content}
			</div>
			
		);
	}

});

module.exports = Inspector;