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
		  reqCtx= this.app[ ctxName],
		  ctx= reqCtx.ctx
	}
	Object.defineProperty( subscribe, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return receipt
}
