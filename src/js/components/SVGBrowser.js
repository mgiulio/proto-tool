var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SVGRectangle = React.createClass({
	
	render: function() {
		var
			{x: x, y: y, width: width, height: height} = this.props,
			titleBarH = 30,
			toolbarH = 40,
			iconSize = 24,
			headerH = titleBarH + toolbarH,
			tbTile = toolbarH,
			iconPad = (tbTile - iconSize) / 2,
			locationBarW = width - tbTile * 4
			//statusBarHeight = 25,
		;
		
		return (
			<g id={this.props.id} className="object browser" transform={`translate(${x}, ${y})`} >
				<rect x="0" y="0" width={width} height={height} />
				<rect x="0" y="0" width={width} height={headerH} />
				<line x1="0" y1={titleBarH} x2={width} y2={titleBarH} />
				<g 
					transform={`translate(0, ${titleBarH})`}
					dangerouslySetInnerHTML={{ __html: `<use x="${iconPad}" y="${iconPad}" width="${iconSize}" height="${iconSize}" xlink:href="#cog" />`}}
					fill="#ff0000"
					stroke="none"
				/>
				<g 
					transform={`translate(${tbTile}, ${titleBarH})`}
					dangerouslySetInnerHTML={{ __html: `<use x="${iconPad}" y="${iconPad}" width="${iconSize}" height="${iconSize}" xlink:href="#tune" />`}}
					fill="#ff0000"
					stroke="none"
				/>
				<g 
					transform={`translate(${tbTile * 2}, ${titleBarH})`}
					dangerouslySetInnerHTML={{ __html: `<use x="${iconPad}" y="${iconPad}" width="${iconSize}" height="${iconSize}" xlink:href="#cog" />`}}
					fill="#ff0000"
					stroke="none"
				/>
				<g 
					transform={`translate(${tbTile * 3}, ${titleBarH})`}
					fill="#ffffff"
					stroke="#999"
				>
					<rect x={0} y={iconPad} width={locationBarW} height={iconSize} />
				</g>
				<g 
					transform={`translate(${width - tbTile}, ${titleBarH})`}
					dangerouslySetInnerHTML={{ __html: `<use x="${iconPad}" y="${iconPad}" width="${iconSize}" height="${iconSize}" xlink:href="#tune" />`}}
					fill="#ff0000"
					stroke="none"
				/>
				{/* <rect x="0" y={height - statusBarHeight} width={width} height={statusBarHeight} /> */}
			</g>
		);
	}

});

module.exports = SVGRectangle;