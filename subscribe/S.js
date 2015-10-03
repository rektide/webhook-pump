var
  base= require( "../base"),
  classiness= require( "insure-classiness")

function S( reqCtx){
	var self= classiness( this, S, reqCtx)
	base( self, reqCtx)
	self.subscribe= self.subscribe|| reqCtx.subscribe // Context indexes by
	if( !self.subscribe){
		throw new Error("Depends on a subscribe")
	}
	self.socket= self.socket|| reqCtx.socket
	if( !self.socket){
		throw new Error("Depends on a subscribe")
	}
	self.send= self.send|| opts.send
	if( !self.send){
		self.send= function( pushCtx){
			if( !pushCtx.pushPath|| !pushCtx.pushHeaders){
				throw new Error( "Param 'pushView' error")
			}
			var push= self.push|| S.push
			var stream= push.call(this, pushCtx.pushPath, pushCtx.pushHeaders)
			stream.end( pushCtx.pushBody)
		}
	}
	var ctx= reqCtx.ctx
	socket.on("end", function(){
		delete ctx.s[ self.id]
		delete ctx.s[ self.symbol]
	})
	return self
}

S.prototype[ "@type"]= S.name.toLowerCase()

S.prototype.subscribe= null
S.prototype.socket= null
S.prototype.send= null
S.prototype.created= null
S.prototype.id= null
S.prototype.symbol= null

S.push= require("node-spdy/lib/spdy/response").push
module.exports= S
module.exports.S= S
