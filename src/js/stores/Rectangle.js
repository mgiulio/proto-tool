function Rectangle(x, y, w, h) {
	this.type = 'Rectangle';
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Rectangle.prototype.setPos = function(x, y) {
	this.x = x;
	this.y = y;
};

Rectangle.prototype.translate = function(x, y) {
	this.x += x;
	this.y += y;
};

module.exports = Rectangle;