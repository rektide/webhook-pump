var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function Subscribe( reqCtx){
	var self= classiness( this, Subscribe, [ reqCtx])
	base( self, reqCtx)
	return self
}

Subscribe.prototype[ "@type"]= Subscribe.name.toLowerCase()
Subscribe.prototype.tick= -1
Subscribe.prototype.created= null
Subscribe.prototype.id= null
Subscribe.prototype.symbol= null

module.exports= Subscribe
module.exports.Subscribe= Subscribe
