var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function Receipt( opts){
	var self= classiness( this, Receipt, opts)
	base( self, opts)
	self.push= self.push|| opts.push
	if( !self.push){
		throw new Error("Depends on a push")
	}
	return self
}

Receipt.prototype["@type"]= "push:receipt"
