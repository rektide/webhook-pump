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
	var
	  socket= opts.socket
	  
	if( !socket){
		throw new Error("Param 's' error")
	}
	self.send= function(){
		
	}
	var
	  ctx= opts.ctx
	socket.on("end", function( ctx){
		delete ctx.s[ self.id]
		delete ctx.s[ self.symbol]
	})
	return self
}

S.prototype[ "@type"]= S.name.toLowerCase()
S.prototype.subscribe= null
S.prototype.send= null
S.prototype.created= null
S.prototype.id= null
S.prototype.symbol= null

module.exports= S
module.exports.S= S
