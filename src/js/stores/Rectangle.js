var
	appConstants = require('../constants/appConstants')
;

function Rectangle(x, y, w, h) {
	this.type = 'Rectangle';
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Rectangle.minSize = 5;

Rectangle.prototype.getAABB = function() {
	return {
		x: this.x,
		y: this.y,
		w: this.w,
		h: this.h
	};
};

Rectangle.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
};

Rectangle.prototype.translate = function(x, y) {
	this.x += x;
	this.y += y;
};

Rectangle.prototype.resizeSide = function(side, amount) {
	switch (side) {
		case appConstants.TOP:
			this.y -= amount;
			this.h += amount;
			break;
		case appConstants.RIGHT:
			this.w += amount;
			break;
		case appConstants.BOTTOM:
			this.h += amount;
			break;
		case appConstants.LEFT:
			this.x -= amount;
			this.w += amount;
			break;
		default:
	}
	
	if (this.w < Rectangle.minSize)
		this.w = Rectangle.minSize;
	if (this.h < Rectangle.minSize)
		this.h = Rectangle.minSize;
};

module.exports = Rectangle;