var
	assign = require('object-assign'),
	appConstants = require('../../constants/AppConstants')
;

var o = assign(Object.create(Object.prototype), {
	
	canvasSize: [null, null],
	
	getType: function() {
		return this.type;
	},
	
	getAABB: function() {
		return {
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h
		};
	},
	
	setPosition: function(x, y) {
		this.x = x;
		this.y = y;
	
		this.checkCanvasBoundary();
	},

	translate: function(dx, dy) {
		this.x += dx;
		this.y += dy;
	
		this.checkCanvasBoundary();
	},

	checkCanvasBoundary: function() {
		if (this.x < 0)
			this.x = 0;
		else if (this.x + this.w >= this.canvasSize[0])
			this.x = this.canvasSize[0] - this.w;
		
		if (this.y < 0)
			this.y = 0;
		else if (this.y + this.h >= this.canvasSize[1])
			this.y = this.canvasSize[1] - this.h;
	},

	setWidth: function(w) {
		this.w = w;
		
		if (this.w < this.minSize)
			this.w = this.minSize;
	},

	setHeight: function(h) {
		this.h = h;
		
		if (this.h < this.minSize)
			this.h = this.minSize;
	},

	resizeSide: function(side, amount) {
		switch (side) {
			case appConstants.TOP:
				if (amount < 0 && (this.h + amount) < this.minSize) {
					this.y -= this.minSize - this.h;
					this.h = this.minSize;
				}
				else {
					this.y -= amount;
					this.h += amount;
				}
				break;
			case appConstants.RIGHT:
				this.w += amount;
				if (this.w < this.minSize)
					this.w = this.minSize;
				break;
			case appConstants.BOTTOM:
				this.h += amount;
				if (this.h < this.minSize)
					this.h = this.minSize;
				break;
			case appConstants.LEFT:
				if (amount < 0 && (this.w + amount) < this.minSize) {
					this.x -= this.minSize - this.w;
					this.w = this.minSize;
				}
				else {
					this.x -= amount;
					this.w += amount;
				}
				break;
			default:
		}
	}
	
});	

module.exports = o;
