var R= require("./R")

/**
  4. Subscribing for Push Message Receipts
  "An application server requests the creation of a receipt subscription
   by sending a HTTP POST request to the receipt subscribe resource
   distributed to the application server by a user agent."
  Provide a Receipt in `Location:`
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-4
*/
function receipt( ctxName){
	function *receipt( next){
		var
		  reqCtx= this[ ctxName],
		  ctx= reqCtx.ctx

		reqCtx.receipt= reqCtx.receipt|| ctx.receipt[ this.params.receiptId]
		if( !reqCtx.receipt){
			throw new Error("Params 'receipt' error")
		}
		if( reqCtx.receipt.push){
			reqCtx.push= ctx.push[ reqCtx.receipt.push]
		}
		if( !reqCtx.push&& reqCtx.receipt.subscribe){
			reqCtx.subscribe= ctx.subscribe[ reqCtx.receipt.subscribe]
		}
		if( !(reqCtx.push|| reqCtx.subscribe)){
			throw new Error("Param 'receipt' error")
		}

		reqCtx.r= new R( reqCtx)

		var hostname= reqCtx.hostname|| ctx.hostname
		this.set( "Location", hostname+ ctx.path("r")+ reqCtx.r.id)
		yield next
	}
	Object.defineProperty( receipt, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return receipt
}

module.exports= receipt
module.exports.receipt= receipt
