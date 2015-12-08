var
	objects = []
	,selected = null
	,rectangle = require('./rectangle')
	,browser = require('./browser')
	,designObjects = {
		'Rectangle': rectangle,
		'Browser': browser
	}
	,baseObject = require('./baseObject')
	,canvasSize = [2000, 1000]
;

baseObject.canvasSize[0] = canvasSize[0];
baseObject.canvasSize[1] = canvasSize[1];

function addObject(type, x, y, w, h) {
	var o = designObjects[type].create(x, y, w, h);
	
	objects.push(o);
	selected = objects.length - 1;
}
	
function select(i) {
	selected = i;
}
	
function selectNext() {
	selected = (selected + 1) % objects.length;
}

function selectPrev() {
	selected--;
	if (selected < 0)
		selected = objects.length - 1;
}
	
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
	
function getSelectedObject() {
	return objects[selected];
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
	select: select,
	selectNext: selectNext,
	selectPrev: selectPrev,
	setPosition: setPosition,
	translate: translate,
	resizeSide: resizeSide,
	setWidth: setWidth,
	setHeight: setHeight,
	getObjects: getObjects,
	getSelectedObject: getSelectedObject,
	getCanvasSize: getCanvasSize,
	setCanvasWidth: setCanvasWidth,
	setCanvasHeight: setCanvasHeight
};
