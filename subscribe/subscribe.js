var
  Subscribe= require("./Subscribe"),
  Push= require("../publisher/Push"),
  Receipt= require("../publisher/Receipt")

/**
  3.  Subscribing for Push Messages
  "A user agent sends a POST request to its configured push service
   resource to create a new subscription."
  Provides a new subscription for the subscriber, 
    and push, push:receipt results to publisher.
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-3
*/
function subscribe(ctxName){
	function *subscribe(next){
		var
		  reqCtx= this.app[ ctxName],
		  ctx= reqCtx.ctx,
		  opts= {
			ctx: ctx,
			subscribe: null,
			push: null,
			receipt: null
		  },
		  _subscribe= new Subscribe(opts),
		opts.subscribe= _subscribe.symbol
		_push= new Push(opts)
		opts.push= _push.symbol
		_receipt= new Receipt(opts)

		ctx.accept( _subscribe, _push, _receipt)
		reqCtx.subscribe= _subscribe
		reqCtx.push= _push
		reqCtx.receipt= _receipt

		this.res.set( "Location", _subscribe.id)
		yield next
	}
	Object.defineProperty( subscribe, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return subscribe
}

module.exports= subscribe
module.exports.subscribe= subscribe
