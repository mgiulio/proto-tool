var
	baseObject = require('./baseObject')
	,assign = require('object-assign')
;

var proto = assign(Object.create(baseObject), {
	
	getTitle: function() {
		return this.title;
	}
	
});

function create(x, y, w, h, title/* = 'untitled'*/) {
	var o = Object.create(proto);
	
	o.type = 'Browser';
	
	o.x = x;
	o.y = y;
	o.w = w;
	o.h = h;
	
	o.title = title;
	
	return o;
}

module.exports = {
	create: create
};