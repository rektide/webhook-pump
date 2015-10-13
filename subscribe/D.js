var
  base= require( "../base"),
  classiness= require( "insure-classiness"),
  util= require("util")

function D( reqCtx){
	var self= classiness( this, D, [ reqCtx])
	self= classiness( self, D, reqCtx)
	self.r= self.r|| reqCtx.r
	if( self.r&& self.r.symbol){
		self.r= self.r.symbol
	}

	self.acked= {}
	self.n= 0
	return self
}
util.inherits( D, base)

D.prototype.ack= function( socket){
}

D.prototype.findSubscribe= function(ctx){
	var
	  receipt,
	  subscribe
	if( !this.r){
		receipt= ctx.receipt[ this.r.receipt]
		if( !receipt){
			throw new Error("Param 'd' error")
		}
	}
	receipt= receipt|| this.receipt
	if( receipt){
		subscribe= ctx.subscribe[ receipt.subscribe]
		if( !subscribe){
			throw new Error("Param 'd' error")
		}
	}
	subscribe= subscribe|| this.subscribe
	return subscribe
}

D.prototype[ "@type"]= D.name.toLowerCase()
D.prototype.r= null
D.prototype.receipt= null
D.prototype.subscribe= null
D.prototype.created= null
D.prototype.id= null
D.prototype.symbol= null

module.exports= D
module.exports.D= D
