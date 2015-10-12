var
  base= require( "../base"),
  classiness= require( "insure-classiness"),
  util= require( "util")

function S( reqCtx){
	var self= classiness( this, S, [ reqCtx])
	self.subscribe= self.subscribe|| reqCtx&& reqCtx.subscribe // Context indexes by
	if( !self.subscribe){
		throw new Error("Depends on a subscribe")
	}
	self.socket= self.socket|| reqCtx&& reqCtx.socket
	if( !self.socket){
		throw new Error("Depends on a subscribe")
	}
	if( !self.socket.symbol){
		self.socket.symbol= Symbol()
	}
	self.send= self.send|| reqCtx&& reqCtx.send|| function( pushCtx){
		if( !pushCtx.pushPath|| !pushCtx.pushHeaders){
			throw new Error( "Param 'pushView' error")
		}
		var push= self.push|| S.push
		var stream= push.call(this, pushCtx.pushPath, pushCtx.pushHeaders)
		stream.end( pushCtx.pushBody)
		//return new Promise( function( resolve, reject){
		//	stream.on("end", function(){
		//		resolve()
		//	})
		//})
	}
	var ctx= reqCtx.ctx
	reqCtx.socket.on("end", function(){
		delete ctx.s[ self.id]
		delete ctx.s[ self.symbol]
	})
	return self
}
util.inherits( S, base)

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
