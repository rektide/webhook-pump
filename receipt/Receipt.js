var
  base= require( "../base"),
  classiness= require( "insure-classiness"),
  util= require("util")

function Receipt( reqCtx){
	var self= classiness( this, Receipt, [ reqCtx])
	self.p= self.p|| reqCtx.p
	if( !self.p){
		// normally receipts only delivered for a specific push, but can alternatively bind wider, to a subscribe
		self.subscribe= self.subscribe|| reqCtx.subscribe.symbol
		if( !self.subscribe){
			throw new Error("Depends on a p")
		}
	}
	if( self.p.symbol){
		self.p= self.p.symbol
	}
	return self
}
util.inherits( Receipt, base)

Receipt.prototype["@type"]= "push:receipt"
Receipt.prototype.p= null
Receipt.prototype.created= null
Receipt.prototype.id= null
Receipt.prototype.symbol= null

module.exports= Receipt
module.exports.Receipt= Receipt
