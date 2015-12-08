var
	baseObject = require('./baseObject')
	,assign = require('object-assign')
;

var proto = assign(Object.create(baseObject), {
});

function create(x, y, w, h) {
	var o = Object.create(proto);
	
	o.type = 'Browser';
	
	o.x = x;
	o.y = y;
	o.w = w;
	o.h = h;
	
	return o;
}

module.exports = {
	create: create
};