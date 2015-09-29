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
function *r( ctxName){
	function r( next){
		if( !this.params){
			return yield next
		}
		var
		  reqCtx= this.app[ ctxName],
		  ctx= reqCtx.ctx,
		  receipt= ctx.receipt[ this.params.receiptId],
		  noReceipt= !receipt,
		  opts= noReceipt? null: {
			ctx: ctx,
			receipt: receipt
		  },
		  _receipter= noReceipt? null: new Receipter(opts)
		if( noReceipt){
			throw new Error("Param 'receipt' error")
		}

		ctx.accept( _receipter)
		reqCtx.receipter= _receipter

		yield next
	}
	Object.defineProperty( r, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return r
}

module.exports= r
module.exports.r= r
