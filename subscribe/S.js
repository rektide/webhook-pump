var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function S( opts){
	var self= classiness( this, S, opts)
	base( self, opts)
	self.subscribe= self.subscribe|| opts.subscribe
	if( !self.subscribe){
		throw new Error("Depends on a subscribe")
	}
	self.tick= self.tick|| opts.tick|| 0
	return self
}

S.prototype[ "@type"]= S.name.toLowerCase()
S.prototype.subscribe= null
S.prototype.created= null
S.prototype.id= null
S.prototype.symbol= null

module.exports= S
module.exports.S= S
