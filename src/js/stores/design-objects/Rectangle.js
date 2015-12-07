var
	baseObject = require('./baseObject')
	,appConstants = require('../../constants/appConstants')
;

var proto = Object.create(baseObject);

proto.minSize = 5;

proto.getType = function() {
	return this.type;
};

proto.getAABB = function() {
	return {
		x: this.x,
		y: this.y,
		w: this.w,
		h: this.h
	};
};

proto.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.checkCanvasBoundary();
};

proto.translate = function(dx, dy) {
	this.x += dx;
	this.y += dy;
	
	this.checkCanvasBoundary();
};

proto.checkCanvasBoundary = function() {
	if (this.x < 0)
		this.x = 0;
	else if (this.x + this.w >= this.canvasSize[0])
		this.x = this.canvasSize[0] - this.w;
	
	if (this.y < 0)
		this.y = 0;
	else if (this.y + this.h >= this.canvasSize[1])
		this.y = this.canvasSize[1] - this.h;
};

proto.setWidth = function(w) {
	this.w = w;
	
	if (this.w < Rectangle.minSize)
		this.w = Rectangle.minSize;
};

proto.setHeight = function(h) {
	this.h = h;
	
	if (this.h < Rectangle.minSize)
		this.h = Rectangle.minSize;
};

proto.resizeSide = function(side, amount) {
	switch (side) {
		case appConstants.TOP:
			if (amount < 0 && (this.h + amount) < Rectangle.minSize) {
				this.y -= Rectangle.minSize - this.h;
				this.h = Rectangle.minSize;
			}
			else {
				this.y -= amount;
				this.h += amount;
			}
			break;
		case appConstants.RIGHT:
			this.w += amount;
			if (this.w < Rectangle.minSize)
				this.w = Rectangle.minSize;
			break;
		case appConstants.BOTTOM:
			this.h += amount;
			if (this.h < Rectangle.minSize)
				this.h = Rectangle.minSize;
			break;
		case appConstants.LEFT:
			if (amount < 0 && (this.w + amount) < Rectangle.minSize) {
				this.x -= Rectangle.minSize - this.w;
				this.w = Rectangle.minSize;
			}
			else {
				this.x -= amount;
				this.w += amount;
			}
			break;
		default:
	}
};

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