
var
  linkP= ["</p/", null, ">; rel=\"urn:ietf:params:push\""]

function subscribeReply( ctxName){
	function *subscribeReply( next){
		var reqCtx= this.ctx[ ctxName]
		linkP[1]= reqCtx.push.id
		this.res.set( "Link", linkP.join(""))
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
