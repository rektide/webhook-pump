var Push= require("./Push")

var
  linkP= ["<", null, null, ">; rel=\"urn:ietf:params:", Push["@type"] ,"\""]

function subscribeReply( ctxName){
	function *subscribeReply( next){
		var reqCtx= this.ctx[ ctxName]
		linkP[1]= reqCtx.ctx.path("p")
		linkP[2]= reqCtx.push.id
		this.res.set( "Link", linkP.join(""))
	}
	Object.defineProperty(subscribeReply, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	subscribeReply.method= "post"
	subscribeReply.path= "subscribe"
	return subscribeReply
}

module.exports= subscribeReply
module.exports.subscribeReply= subscribeReply
