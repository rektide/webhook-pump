var
  D= require("../subscribe/D"),
  R= require("../receipt/R"),
  Push= require("./Push")

/**
  5. Requesting Push Message Delivery
  "An application server requests the delivery of a push message by
   sending a HTTP request to a push resource distributed to the
   application server by a user agent.  The push message is included in
   the body of the request"
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-5
*/
function p( ctxName){
	function *p( next){
		var
		  reqCtx= this[ ctxName],
		  ctx= reqCtx.ctx

		reqCtx.p= reqCtx.p|| ctx.p[ this.params.pId]
		reqCtx.subscribe= reqCtx.subscribe|| ctx.subscribe[ reqCtx.p.subscribe]

		// extract r, validate if no d yet
		if( !reqCtx.d){
			// find the push-receipt (r)
			if( reqCtx.r=== undefined){
				var rId= this.params.rId
				if( rId=== undefined){
					rId= this.request.header["push-receipt"]
				}
				if( rId!== undefined){
					reqCtx.r= reqCtx.r[ rId]
					if( reqCtx.r=== undefined){
						throw new Error("Param 'push-receipt' error")
					}
				}
			}
			if( reqCtx.r!== undefined){
				var
				  receipt= reqCtx.r.receipt? reqCtx.receipt[ reqCtx.r.receipt]: null,
				  subscribe= receipt? reqCtx.subscribe[ receipt.subscribe]: null
				if( !subscribe|| subscribe!== reqCtx.subscribe.symbol){
					throw new Error("Param 'r' error")
				}
			}
			reqCtx.d= new D(reqCtx)
			reqCtx.ctx.accept( reqCtx.d)
		}

		var
		  push= reqCtx.push= new Push( reqCtx),
		  view= push.send( this.req, this.request.headers, reqCtx.ctx)

		this.body= ""
		this.type= ""
		this.status= 201
		if( view.deletePath){
			this.set( "Location", view.deletePath)
		}

		yield next
	}
	Object.defineProperty( p, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	p.method= "post"
	p.param= "pId"
	return p
}

module.exports= p
module.exports.p= p
