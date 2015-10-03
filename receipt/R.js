var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function R( reqCtx){
	var self= classiness( this, R, reqCtx)
	base( self, reqCtx)

	self.receipt= self.receipt|| reqCtx.receipt
	self.socket= self.socket|| reqCtx.socket
	if( !self.socket){
		throw new Error("Depends on a subscribe")
	}
	return self
}

R.prototype[ "@type"]= R.name.toLowerCase()
R.prototype.receipt= null
R.prototype.socket= null
R.prototype.created= null
R.prototype.id= null
R.prototype.symbol= null

module.exports= R
module.exports.R= R
