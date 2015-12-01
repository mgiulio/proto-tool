var
	objects = [],
	selected = null,
	Rectangle = require('./Rectangle'),
	designObjects = {
		'Rectangle': Rectangle
	},
	canvasSize = [1600, 500]
;

function addObject(type, x, y, w, h) {
	var o = new designObjects[type](x, y, w, h); 
	
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
	return  canvasSize;
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
	getCanvasSize: getCanvasSize
};
