var 
	compose2 = function(f, g) {
		return function() {
			return f.call(this, g.apply(this, arguments));
		}
    },
	compose3 = function(f, g, h) {
		return function() {
			return f.call(this, g.call(this, h.apply(this, arguments)));
		}
    },
	compose = function() { // From Underscore.js
		var args = arguments;
		var start = args.length - 1;
		return function() {
			var i = start;
			var result = args[start].apply(this, arguments);
			while (i--) result = args[i].call(this, result);
			return result;
		}
	}
;

module.exports = {
	compose: compose,
	compose2: compose2,
	compose3: compose3
};
