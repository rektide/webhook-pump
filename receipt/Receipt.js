var
  base= require( "../base"),
  classiness= require( "insure-classiness"),
  util= require("util")

function Receipt( reqCtx){
	var self= classiness( this, Receipt, [ reqCtx])
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
util.inherits( Receipt, base)

Receipt.prototype["@type"]= "push:receipt"
Receipt.prototype.push= null
Receipt.prototype.created= null
Receipt.prototype.id= null
Receipt.prototype.symbol= null

module.exports= Receipt
module.exports.Receipt= Receipt
