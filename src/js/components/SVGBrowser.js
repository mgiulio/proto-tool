var
   React = require('react')
   ,AppActions = require('../actions/AppActions')
;

var SVGBrowser = React.createClass({
	
	render: function() {
		var classes = ['object', 'browser'];
		if (this.props.className)
			classes.push(this.props.className);
		
		var
			{x: x, y: y, width: width, height: height, title: title} = this.props,
			titleBarH = 30,
			toolbarH = 40,
			iconSize = 24,
			headerH = titleBarH + toolbarH,
			tbTile = toolbarH,
			iconPad = (tbTile - iconSize) / 2,
			locationBarW = width - tbTile * 4
			//statusBarHeight = 25,
		;
		
		if (!title)
			title = 'A Web Page';
		
		return (
			<g 
				id={this.props.id} 
				className={classes.join(' ')}
				transform={`translate(${x}, ${y})`} 
				onClick={this.onClick}
			>
				<rect x={0} y={0} width={width} height={height} />
				<rect x={0} y={0} width={width} height={headerH} />
				<text x={width / 2} y={titleBarH - 10} textAnchor="middle" fontFamily="Verdana" fontSize="14" fill="#333">{title}</text>
				<line x1={0} y1={titleBarH} x2={width} y2={titleBarH} />
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
	},
	
	onClick: function(e) {
		e.stopPropagation();
		
		if (e.shiftKey)
			AppActions.selection.toggle(this.props.id);
		else
			AppActions.selection.select(this.props.id);
	}

});

module.exports = SVGBrowser;