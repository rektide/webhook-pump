var
  base= require( "../base"),
  classiness= require( "insure-classiness"),
  util= require( "util"),
  D= require("../subscribe/D")

/**
  Model for a thing being pushed
*/
function Push( opts){
	var self= classiness( this, Push, [ opts])
	if( opts){
		self.subscribe= self.subscribe|| opts.subscribe
		self.p= self.p|| opts.p
		self.r= self.r|| opts.r
		self.d= self.d|| opts.d
		self.pushView= self.pushView|| opts.pushView|| opts.ctx&& opts.ctx.pushView
	}
	if( !self.subscribe&& self.p&& opts.ctx){
		var p= self.p
		if( !p.symbol){
			p= ctx.p[ self.p]
		}
		if( p){
			self.subscribe= p.subscribe
		}
	}
	if( !self.subscribe){
		throw new Error("Depends on a subscribe")
	}

	if( self.subscribe.symbol){
		self.subscribe= self.subscribe.symbol
	}
	if( self.p&& self.p.symbol){
		self.p= self.p.symbol
	}
	if (self.r&& self.r.symbol){
		self.r= self.r.symbol
	}
	if( self.d&& self.d.symbol){
		self.d= self.d.symbol
	}

	return self
}
util.inherits( Push, base)

Push.prototype.p= null
Push.prototype.r= null
Push.prototype.d= null
Push.prototype.pushView= require("./pushView")


Push.prototype.send= function send( source, headers, ctx){
	var
	  dId= this._d( ctx),
	  s= this._s( ctx),
	  deleteBase= ctx.path( "d"),
	  pushCtx= this.pushView( headers, dId, deleteBase)

	if( s){
		for( var i= 0;i < s.length; ++i){
			var
			  sId= s[i],
			  s= ctx.s[ sId]
			s.send( source, pushCtx)
		}
	}else{
		if( !this.okEmpty&& !module.exports.okEmpty){
			throw new Error( "Param 'push' error")
		}else if( this.warn|| module.exports.warn){
			console.warn("no one to send push to")
		}
	}
	return pushCtx
}

Push.prototype._d= function( ctx){
	var type= typeof( this.d)
	if( ctx&& this.d){
		if( type=== "symbol"){
			var d= ctx.d[ this.d]
			if( d){
				return d.id
			}
		}
		if( this.d.symbol){
			var d= ctx.d[ this.d.symbol]
			if( d){
				return d.id
			}
		}
		if( this.d.id){
			var d= ctx.d[ this.d.symbol]
			if( d){
				return d.id
			}
		}
	}
	if( this.d){
		throw new Error("Param 'd' error")
	}

	if( this.r){
		var d= new D( this)
		if( ctx){
			ctx.accept(d)
		}
		this.d= d.symbol
		return d.id
	}
}

Push.prototype._s= function( ctx){
	if( this.s){
		return this.s
	}
	if( !this.subscribe){
		throw new Error( "Param 'p' error")
	}
	return ctx.subscribeToS( this.subscribe)
}

Push.prototype[ "@type"]= Push.name.toLowerCase()
Push.prototype.subscribe= null
Push.prototype.created= null
Push.prototype.id= null
Push.prototype.symbol= null

module.exports= Push
module.exports.Push= Push
