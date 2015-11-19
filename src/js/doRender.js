var
	React = require('react')
	,SVGRectangle = require('./components/SVGRectangle')
;

function svgRender(om, i) {
	var compo;
	
	switch (om.type) {
		case 'Rectangle':
			compo = <SVGRectangle 
				id={i} 
				x={om.x} y={om.y} width={om.w} height={om.h} 
				key={i} 
			/>;
			break;
		default:
			console.log(om);
	}
	
	return compo;
}
	
module.exports = svgRender;