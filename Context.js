var
  insureClassiness= require( "insure-classiness"),
  projection= require("observed-time-projection"),
  uuid= require( "node-uuid")

function Context( opts){
	var self= insureClassiness( this, Context, opts)
	self.subscribe= {}
	self.push= {}
	self[ "push:receipt"]= {}
	self.s= {}
	self.d= {}

	// views
	self.subscribeToS= projection(self.s, function( s){
		return s.symbol // to all s for subscribe
	}, function( s){
		return s.subscribe // map from subscribe
	})
	return self
}

Context.prototype.subscribe= null
Context.prototype.push= null
Context.prototype[ "push:receipt"]= null
Context.prototype.s= null
Context.prototype.d= null
Context.prototype.subscribeToS= null

function path( name){
	return this.path[ name]|| path[ name]
}
Context.prototype.path= path
var _paths= ["subscribe", "p", "d", "r", "d", "receipt"]
for(var i in _paths){
	path[ _paths[i]]= "/"+ _paths[i]+ "/"
}
_paths.receipt= "/receipts/"

Context.prototype.name= "webpushPump" // app name

Context.prototype.accept= function(){
	var slots= new Array( arguments.length)
	for( var i= 0; i< arguments.length; ++i){
		var
		  o= arguments[ i],
		  type= o[ '@type']
		if( !type){
			throw new Error( "Expected a `@type` for argument "+ i)
		}
		if( !o.id&& !o.symbol){
			throw new Error( "Expected identifier for argument "+ i)
		}
		var slot= slots[i]= this[ type]
		if( slot[o.id]!== undefined){
			throw new Error( "Duplicate identifier (id)")
		}
		if( slot[o.symbol]!== undefined){
			throw new Error( "Duplicate identifier (symbol)")
		}
	}
	for( var i= 0; i< arguments.length; ++i){
		var
		  o= arguments[ i],
		  slot= slots[ i]
		if( o.symbol){
			slot[ o.symbol]= o
		}
		if( o.id){
			slot[ o.id]= o
		}
	}
}
