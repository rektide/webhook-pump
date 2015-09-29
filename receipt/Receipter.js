var
  base= require( "../base"),
  classiness= require( "insure-classiness"),

function Receipter( opts){
	var self= classiness( this, Receipter, opts)
	base( self, opts)
	self.receipt= self.receipt|| opts.receipt
	return self
}

Receipter.prototype[ "@type"]= Receipter.name.toLowerCase()
