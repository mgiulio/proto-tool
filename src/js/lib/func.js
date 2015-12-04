var
	placeholder = '_', // symbol? Object? function?
	compose = function(f, g, h) {  // Adapted from Underscore.js
		var 
			args = arguments,
			start = args.length - 1,
			out
		;
		
		if (start === 1)
			out = function() { return f.call(this, g.apply(this, arguments)); }
		else if (start === 2)
			out = function() { return f.call(this, g.call(this, h.apply(this, arguments))); }
		else 
			out = function() {
				var 
					i = start,
					result = args[start].apply(this, arguments)
				;
				while (i--) result = args[i].call(this, result);
				return result;
			}
		
		return out;
	},
	partial = function(f, ...boundArgs) {
		return function() {
			var 
				position = 0, 
				length = boundArgs.length,
				args = Array(length)
			;
			
			for (var i = 0; i < length; i++)
				args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
			
			while (position < arguments.length) args.push(arguments[position++]);
			
			return f.apply(this, args);
		};
	}
;

module.exports = {
	compose: compose,
	partial: partial
};

/*
var shape = {
	x: 0,
	y: 0,
	translate: function(dx, dy) { this.x += dx; this.y += dy; }
};
			
var 
	goLeft = partial(shape.translate, -1, 0).bind(shape) // Note how we could leave dx free, for example to specify speed
	//,goLeftBy = partial(shape.translate, _, 0).bind(shape)
	//moveRight = partial(shape.translate, 1, 0)

console.log(shape);
goLeft(); // o.x === -1
console.log(shape);
*/