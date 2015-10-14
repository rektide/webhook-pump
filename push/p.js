var
  D= require("../subscribe/D"),
  R= require("../receipt/R")

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

		reqCtx.push= reqCtx.push|| ctx.push[ this.params.pId]
		if( !reqCtx.push){
			throw new Error( "Param 'push' error")
		}
		reqCtx.subscribe= reqCtx.subscribe|| ctx.subscribe[ reqCtx.push.subscribe]
		if( !reqCtx.subscribe){
			if( p.noSubscribeOk){
				return yield next
			}
			throw new Error( "Param 'push' error")
		}
		reqCtx.s = reqCtx.s|| ctx.subscribeToS( reqCtx.subscribe.symbol)
		if( !reqCtx.s){
			if( p.noSOk){
				return yield next
			}
			throw new Error( "Param 'push' error")
		}

		// extract r, validate, make d
		if( !reqCtx.d){
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
		}

		if( !reqCtx.pushView){
			if( !reqCtx.request){
				reqCtx.request= this.request
			}
			(reqCtx.pushView|| reqCtx.ctx.pushView)( reqCtx, this.request)
		}

		for( var i= 0;i < reqCtx.s.length; ++i){
			var
			  sId= reqCtx.s[i],
			  s= ctx.s[ sId]
			s.send( reqCtx, this.req) // node not koa!
		}

		this.body= ""
		this.type= ""
		this.status= 201
		if( reqCtx.pushPath){
			this.set( "Location", reqCtx.pushPath)
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
