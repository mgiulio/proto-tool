var
	baseObject = require('./baseObject')
	,assign = require('object-assign')
;

var proto = assign(Object.create(baseObject), {
	
	minSize: 10
	
});

function create(x, y, w, h) {
	var o = Object.create(proto);
	
	o.type = 'Picture';
	
	o.x = x;
	o.y = y;
	o.w = w;
	o.h = h;
	
	return o;
}

module.exports = {
	create: create
};