var
	baseObject = require('./baseObject')
	,appConstants = require('../../constants/appConstants')
	,assign = require('object-assign')
;

var proto = assign(Object.create(baseObject), {
	
	minSize: 5
	
});

function create(x, y, w, h) {
	var o = Object.create(proto);
	
	o.type = 'Rectangle';
	
	o.x = x;
	o.y = y;
	o.w = w;
	o.h = h;
	
	return o;
}

module.exports = {
	create: create
};