var
	baseObject = require('./baseObject')
	,assign = require('object-assign')
;

var proto = assign(Object.create(baseObject), {
	
	getTitle: function() {
		return this.title;
	}
	
});

function create(x, y, w, h, rest) {
	var o = Object.create(proto);
	
	o.type = 'Browser';
	
	o.x = x;
	o.y = y;
	o.w = w;
	o.h = h;
	
	o.title = rest[0];
	
	return o;
}

module.exports = {
	create: create
};