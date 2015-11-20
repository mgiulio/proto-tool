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

Rectangle.prototype.resizeSide = function(side, amount) {
	switch (side) {
		case 'top':
			this.y -= amount;
			this.h += amount;
			break;
		case 'right':
			this.w += amount;
			break;
		case 'bottom':
			this.h += amount;
			break;
		case 'left':
			this.x -= amount;
			this.w += amount;
			break;
		default:
			// throw?
	}
};

module.exports = Rectangle;