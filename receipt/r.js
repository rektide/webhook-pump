var
  Receipt= require("./Receipt")

/**
  6.2.  Receiving Push Message Receipts
  "The application server requests the delivery of receipts from the
   push server by making a HTTP GET request to the receipt subscription
   resource.  The push service does not respond to this request, it
   instead uses HTTP/2 server push [RFC7540] to send push receipts when
   messages are acknowledged (Section 6.1) by the user agent."
  Provided as `Location:` in response to a `/receipt` request
  Attached to Push Message Delivery `/p` requests as a `Push-Receipt` field
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-6.2
*/
function r( ctxName){
	function *r( next){
		var
		  reqCtx= this[ ctxName],
		  ctx= reqCtx.ctx

		reqCtx.r= reqCtx.r|| ctx.r[ this.params.rId]
		if( !reqCtx.r){
			throw new Error("Param 'r' error")
		}
		if( !reqCtx.socket){
			reqCtx.socket= this.socket
		}

		self.r= new R(reqCtx)
		ctx.accept( self.r)

		yield next
	}
	Object.defineProperty( r, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	r.method= "get"
	r.params= "rId"
	return r
}

module.exports= r
module.exports.r= r
