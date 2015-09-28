
var
  linkP= ["</p/", null, ">; rel=\"urn:ietf:params:push\""],
  linkR= ["</receipts/", null, ">; rel=\"urn:ietf:params:push:receipt\""]

function subsribeReply(ctxName){
	return subscribeReply*( next){
		var reqCtx= this.ctx[ ctxName]
		linkP[1]= reqCtx.push.id
		this.res.set( "Link", linkP.join(""))
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
