var
	appConstants = require('../../constants/appConstants')
;

function Rectangle(x, y, w, h) {
	this.type = 'Rectangle';
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.canvasSize = 
		//[600, 300]
		[2000, 1000]
	;
}

Rectangle.minSize = 5;

Rectangle.prototype.getType = function() {
	return this.type;
};

Rectangle.prototype.getAABB = function() {
	return {
		x: this.x,
		y: this.y,
		w: this.w,
		h: this.h
	};
};

Rectangle.prototype.setPosition = function(x, y) {
	this.x = x;
	this.y = y;
	
	this.checkCanvasBoundary();
};

Rectangle.prototype.translate = function(dx, dy) {
	this.x += dx;
	this.y += dy;
	
	this.checkCanvasBoundary();
};

Rectangle.prototype.checkCanvasBoundary = function() {
	if (this.x < 0)
		this.x = 0;
	else if (this.x + this.w >= this.canvasSize[0])
		this.x = this.canvasSize[0] - this.w;
	
	if (this.y < 0)
		this.y = 0;
	else if (this.y + this.h >= this.canvasSize[1])
		this.y = this.canvasSize[1] - this.h;
};

Rectangle.prototype.setWidth = function(w) {
	this.w = w;
	
	if (this.w < Rectangle.minSize)
		this.w = Rectangle.minSize;
};

Rectangle.prototype.setHeight = function(h) {
	this.h = h;
	
	if (this.h < Rectangle.minSize)
		this.h = Rectangle.minSize;
};

Rectangle.prototype.resizeSide = function(side, amount) {
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

module.exports = Rectangle;