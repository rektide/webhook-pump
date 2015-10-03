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
		  reqCtx= this.app[ ctxName],
		  ctx= reqCtx.ctx

		reqCtx.push= reqCtx.p|| ctx.push[ this.params.pId]
		if( !reqCtx.push){
			throw new Error( "Param 'push' error")
		}
		reqCtx.subscribe= reqCtx.subscribe|| ctx.subscribe[ reqCtx.push]
		if( !reqCtx.subscribe){
			if( p.noSubscribeOk){
				return yield next
			}
			throw new Error( "Param 'push' error")
		}
		reqCtx.ses = reqCtx.subscribers|| ctx.subscribeToS( subscribe.symbol)
		if( !reqCtx.ses){
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
					rId= this.req.headers["push-receipt"]
				}
				if( rId!== undefined){
					reqCtx.r= reqCtx.r[ rId]
					if( reqCtx.r=== undefined){
						throw new Error("Param 'r' error")
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
			reqCtx.d= new D(reqCtx) // subscriber acks
		}

		if( !reqCtx.pushView){
			if( !reqCtx.req){
				reqCtx.req= this.req
			}
			reqCtx.pushView= new (reqCtx.PushView|| reqCtx.ctx.PushView)( reqCtx)
			yield next // BREAK
		}

		var _done= new Array(subscribers.length)
		for(var i= 0;i < reqCtx.ses.length; ++i){
			va
			  s= reqCtx.ses[i]
			done[i]= s.send( pushView)
		}

		this.status= 201
		if( reqCtx.d.id){
			this.res.headers["Location"]= ctx.path("d")+ reqCtx.d.id
		}

		yield next
	}
	Object.defineProperty( p, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
}

module.exports= p
module.exports.p= p
