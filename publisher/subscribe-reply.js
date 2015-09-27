
var
  linkP= ["</p/", null, ">; rel=\"urn:ietf:params:push\""],
  linkR= ["</receipts/", null, ">; rel=\"urn:ietf:params:push:receipt\""]

function subsribeReply(){
	return subscribeReply*( next){
		var reqCtx= this.ctx[ ctx.name]
		linkP[1]= reqCtx.push.id
		this.res.set( "Link", linkP.join(""))
		linkR[1]= reqCtx.receipt.id
		this.res.set( "Link", linkR.join(""))
	}
}
