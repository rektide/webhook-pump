// Inherit Classiness doesn't recurse the prototype chain, so manually apply this instead

var
  classiness= require( "insure-classiness"),
  hash= require( "./util/hash")

function base( opts){
	var self= classiness( this, base, [ opts] )
	self.symbol= self.symbol|| opts&& opts.symbol|| Symbol()
	self.created= self.created|| opts&&( opts.created|| opts.timestamp|| opts.ctx&& opts.ctx.timestamp)||( new Date()).getTime()
	var _type= self[ "@type"]|| opts[ "@type"]
	self.id= self.id|| opts&& opts.id
	if( !self.id&& self.hash){
		if( _type&& self.hash[ _type]){
			self.id= self.hash[ _type]( self, opts)
		}
		if( !self.id){
			self.id= opts.hash( self, opts)
		}
	}
	if( !self.id&& opts&& opts.hash){
		if( _type&& opts.hash[ _type]){
			self.id= opts.hash[ _type]( self, opts)
		}
		if( !self.id){
			self.id= opts.hash( self, opts)
		}
	}
	if( !self.id){
		self.id= hash( self, opts)
	}
	return self
}
module.exports= base
