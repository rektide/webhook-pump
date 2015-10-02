var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function D( opts){
	var self= classiness( this, D, opts)
	base( self, opts)
	self.r= self.d|| opts.r.symbol|| null
	if( !self.r){
		self.receipt= self.receipt|| opts.receipt|| null
		if( !self.receipt){
			self.subscribe= self.subscribe|| opts.subscribe.symbol
		}
	}
	if( !self.r&& !self.receipt&& !self.subscribe){
		throw new Error("Need an anchor for D")
	}
	return self
}

D.prototype.findSubscribe= function(ctx){
	var
	  receipt,
	  subscribe
	if( this.r){
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
