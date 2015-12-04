var
   React = require('react')
;

var Icon = React.createClass({

	render: function() {
		var classString = 'icon ' + this.props.which;
		if (this.props.className)
			classString += ' ' + this.props.className;

		return (
			<svg
				className={classString}
				dangerouslySetInnerHTML={{ __html: `<use xlink:href="#${this.props.which}" />` /* img/sprite.svg */}}
			/>
		);
	}

});

module.exports = Icon;
