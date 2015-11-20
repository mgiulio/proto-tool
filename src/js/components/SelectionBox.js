var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SelectionBox = React.createClass({
	
	render: function() {
		var
			{x: x, y: y, w: w, h: h} = this.props,
			hw = w / 2,
			hh = h / 2,
			mp = [ // handle midpoints
				[hw, 0], // top edge
				[w , hh], // right
				[hw, h], // bottom
				[0 , hh], // left
			],
			handles = mp.map(mp => <Handle x={mp[0]} y={mp[1]} />);
		;
		
		return (
			<g className="selection-box" transform={`translate(${x}, ${y})`} >
				<rect x="0" y="0" width={w} height={h} />
				{handles}
			</g>
		);
	}

});

var Handle = React.createClass({
	
	render: function() {
		var
			size = 5,
			hs = size / 2,
			{x: x, y: y} = this.props
		;
		
		return (
			<rect className="handle" x={x - hs} y={y - hs} width={size} height={size} />
		);
	}
	
});

module.exports = SelectionBox;