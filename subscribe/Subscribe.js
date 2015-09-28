var
  base= require( "../base"),
  classiness= require( "insure-classiness"),

function Subscribe( opts){
	var self= classiness( this, Subscriber, opts)
	base( self)
	self.tick= self.tick|| opts.tick|| 0
	return self
}

Subscribe.prototype[ "@type"]= Subscribe.name.toLowerCase()
