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
	}

};
		
function setPosition(x, y) {
	objects[selected].setPosition(x, y);
}

function setWidth(w) {
	objects[selected].setWidth(w);
}

function setHeight(h) {
	objects[selected].setHeight(h);
}

function translate(x, y) {
	objects[selected].translate(x, y);
}

function resizeSide(side, amount) {
	objects[selected].resizeSide(side, amount);
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

function moveUp() {
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
