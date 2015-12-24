var
	objects = []
	,rectangle = require('./rectangle')
	,browser = require('./browser')
	,picture = require('./picture')
	,designObjects = {
		'Rectangle': rectangle
		,'Browser': browser
		,'Picture': picture
	}
	,baseObject = require('./baseObject')
	,canvasSize = [2000, 1000]
;

baseObject.canvasSize[0] = canvasSize[0];
baseObject.canvasSize[1] = canvasSize[1];

function addObject(type, x, y, w, h, rest) {
	var o = designObjects[type].create(x, y, w, h, rest);
	
	objects.push(o);
	selection.select(objects.length - 1);
}

function removeObject() {
	var i = 0;
	while (i < objects.length)
		if (objects[i].selected)
			objects.splice(i, 1);
		else
			i++;
}

var selection = {
	
	select: function(i) {
		objects.forEach(o => {o.selected = false});
		objects[i].selected = true;
	},
	
	toggle: function(i) {
		objects[i].selected = ! objects[i].selected;
	},
	
	get: function() {
		return objects.filter(o => o.selected);
	},
	
	all: function() {
		objects.forEach(o => {o.selected = true});
	},
	
	invert: function() {
		objects.forEach(o => {o.selected = ! o.selected});
	},
	
	clear: function () {
		objects.forEach(o => {o.selected = false});
	},
	inRect: function(start, end, add) {
		var
			rxmin,
			rxmax,
			rymin,
			rymax
		;
		if (start[0] < end[0]) {
			rxmin = start[0];
			rxmax = end[0];
		}
		else {
			rxmin = end[0];
			rxmax = start[0];
		}
		if (start[1] < end[1]) {
			rymin = start[1];
			rymax = end[1];
		}
		else {
			rymin = end[1];
			rymax = start[1];
		}
		
		objects.forEach(o => {
			var 
				b = o.getAABB(),
				xmin = b.x,
				xmax = b.x + b.w,
				ymin = b.y,
				ymax = b.y + b.h
			;
			if (xmin >= rxmin && xmax <= rxmax && ymin >= rymin && ymax <= rymax)
				o.selected = true;
			else if (!add)
				o.selected = false;
		});
	}

};2
		
function setPosition(x, y) {
	selection.get().forEach(o => { o.setPosition(x, y); });
}

function setWidth(w) {
	selection.get().forEach(o => { o.setWidth(w); });
}

function setHeight(h) {
	selection.get().forEach(o => { o.setHeight(h); });
}

function translate(x, y) {
	selection.get().forEach(o => { o.translate(x, y); });
}

function resizeSide(side, amount) {
	selection.get().forEach(o => { o.resizeSide(side, amount); });
}

function moveUp() {
	var s = selection.get();
	if (s.length !== 1)
		return;
	
	var newPos = selected + 1;
	
	if (newPos === objects.length)
		return;
	
	var tmp = objects[newPos];
	objects[newPos] = objects[selected];
	objects[selected] = tmp;
	
	selected = newPos;
}

function moveDown() {
	var newPos = selected - 1;
	
	if (newPos < 0)
		return;
	
	var tmp = objects[newPos];
	objects[newPos] = objects[selected];
	objects[selected] = tmp;
	
	selected = newPos;
}

function getObjects() {
	return objects;
}
	
function getCanvasSize() {
	return canvasSize;
}

function setCanvasWidth(w) {
	canvasSize[0] = w;
	
	baseObject.canvasSize[0] = w;
}

function setCanvasHeight(h) {
	canvasSize[1] = h;
	
	baseObject.canvasSize[1] = h;
}

module.exports = {
	addObject: addObject,
	removeObject: removeObject,
	
	setPosition: setPosition,
	translate: translate,
	resizeSide: resizeSide,
	setWidth: setWidth,
	setHeight: setHeight,
	getObjects: getObjects,
	
	selection: selection,
	
	getCanvasSize: getCanvasSize,
	setCanvasWidth: setCanvasWidth,
	setCanvasHeight: setCanvasHeight
	,moveUp: moveUp
	,moveDown: moveDown
};
