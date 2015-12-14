var
	React = require('react')
	,SVGRectangle = require('./components/SVGRectangle')
	,SVGBrowser = require('./components/SVGBrowser')
	,SVGPicture = require('./components/SVGPicture')
;

function svgRender(om, i) {
	var compo;
	
	switch (om.type) {
		case 'Rectangle':
			compo = <SVGRectangle 
				id={i} 
				className={om.selected ? 'selected' : null}
				x={om.x} y={om.y} width={om.w} height={om.h} 
				key={i} 
			/>;
			break;
		case 'Browser':
			compo = <SVGBrowser
				id={i} 
				className={om.selected ? 'selected' : null}
				x={om.x} y={om.y} width={om.w} height={om.h} title={om.getTitle()} 
				key={i} 
			/>;
			break;
		case 'Picture':
			compo = <SVGPicture 
				id={i} 
				className={om.selected ? 'selected' : null}
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