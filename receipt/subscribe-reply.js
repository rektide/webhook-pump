
var
  linkR= ["</receipts/", null, ">; rel=\"urn:ietf:params:push:receipt\""]

function subsribeReply(ctxName){
	function *subscribeReply( next){
		var reqCtx= this.ctx[ ctxName]
		linkR[1]= reqCtx.receipt.id
		this.res.set( "Link", linkR.join(""))
	}
	Object.defineProperty(s, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return subscribeRepy

}

module.exports= subscribeReply
module.exports.subscribeReply= subscribeReply
