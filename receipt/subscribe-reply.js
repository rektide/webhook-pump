var Receipt= require("./Receipt")

var
  linkR= ["<", null, null, ">; rel=\"urn:ietf:params:", Receipt["@type"], "\""]

function subscribeReply( ctxName){
	function *subscribeReply( next){
		var reqCtx= this.ctx[ ctxName]
		linkR[1]= reqCtx.ctx.path("receipt")
		linkR[2]= reqCtx.receipt.id
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
