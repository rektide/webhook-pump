var
  Subscribe= require("./Subscribe"),
  P= require("../push/P"),
  Receipt= require("../receipt/Receipt")

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
		  reqCtx= this[ ctxName],
		  ctx= reqCtx.ctx,
		  _created

		if( !reqCtx.subscribe){
			reqCtx.subscribe= _created= new Subscribe( reqCtx)
			ctx.accept( _created)
		}
		if( !reqReqCtx.p){
			reqCtx.push= _created= new P( reqCtx)
			ctx.accept( _created)
		}
		if( !reqCtx.receipt){
			reqCtx.receipt= _created= new Receipt( reqCtx)
			ctx.accept( _created)
		}

		var hostname= reqCtx.hostname|| ctx.hostname
		this.set( "Location", hostname+ ctx.path("s")+ reqCtx.subscribe.id)
		yield next
	}
	Object.defineProperty( subscribe, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	subscribe.method= "post"
	return subscribe
}

module.exports= subscribe
module.exports.subscribe= subscribe
