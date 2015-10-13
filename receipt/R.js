var
  base= require( "../base"),
  classiness= require( "insure-classiness"),
  util= require( "util")

function R( reqCtx){
	var self= classiness( this, R, [ reqCtx])

	self.receipt= self.receipt|| reqCtx.receipt
	if( self.receipt.symbol){
		self.receipt= self.receipt.symbol
	}
	self.socket= self.socket|| reqCtx.socket
	if( !self.socket){
		throw new Error("Depends on a subscribe")
	}
	return self
}
util.inherits( R, base)

R.prototype[ "@type"]= R.name.toLowerCase()
R.prototype.receipt= null
R.prototype.socket= null
R.prototype.created= null
R.prototype.id= null
R.prototype.symbol= null

module.exports= R
module.exports.R= R
