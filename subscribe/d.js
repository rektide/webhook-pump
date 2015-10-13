/**
  6.1.  Acknowledging Push Messages
   To ensure that a push message is properly delivered to the user agent
   at least once, the user agent MUST acknowledge receipt of the message
   by performing a HTTP DELETE on the push message resource.
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-6.1
*/
function d( ctxName){
	function *d( next){
		var reqCtx= this[ ctxName],
		  ctx= reqCtx.ctx
		reqCtx.d= reqCtx.d|| ctx.d[ this.params.dId]
		if( !reqCtx.d){
			throw new Error("Param 'd' error")
		}

		d.ack(this.socket)
	}
	Object.defineProperty( d, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	d.method= "delete"
	d.param= "dId"
	return d
}

module.exports= d
module.exports.d= d
