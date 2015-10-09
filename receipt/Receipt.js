var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function Receipt( reqCtx){
	var self= classiness( this, Receipt, [ reqCtx])
	base( self, reqCtx)
	self.push= self.push|| reqCtx.push.symbol
	if( !self.push){
		// normally receipts only delivered for a specific push, but can alternatively bind wider, to a subscribe
		self.subscribe= self.subscribe|| reqCtx.subscribe.symbol
		if( !self.subscribe){
			throw new Error("Depends on a push")
		}
	}
	return self
}

Receipt.prototype["@type"]= "push:receipt"
Receipt.prototype.push= null
Receipt.prototype.created= null
Receipt.prototype.id= null
Receipt.prototype.symbol= null

module.exports= Receipt
module.exports.Receipt= Receipt
