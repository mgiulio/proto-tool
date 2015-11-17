var 
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
	}
;

module.exports = {
	compose: compose
};
