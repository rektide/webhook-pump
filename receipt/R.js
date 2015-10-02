var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function R( opts){
	var self= classiness( this, R, opts)
	base( self, opts)
	self.receipt= self.receipt|| opts.receipt
	return self
}

R.prototype[ "@type"]= R.name.toLowerCase()
R.prototype.receipt= null
R.prototype.created= null
R.prototype.id= null
R.prototype.symbol= null

module.exports= R
module.exports.R= R
