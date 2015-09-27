function *spdyPush(next){
	Object.defineProperty(context, 'isSpdy', {
		get: function () {
		return this.res.isSpdy;
		}
	})
	
	// to do: make threshold configurable
	var spdy = require('spdy-push');
	context.push = function () {
	  if (!this.res.isSpdy) return;
	  var _spdy = spdy(this.res);
	  return _spdy.push.apply(_spdy, arguments);
	}
}
