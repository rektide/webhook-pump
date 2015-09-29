var
  time= require("util/time")

function pre(ctxName){
	function *pre( next){
		var app= this.app
		if( !app){
			app= this.app= {}
		}
		var reqCtx= app[ ctxName]
		if( !reqCtx){
			reqCtx= app[ ctxName]= {ctx: ctx}
		}
		this.params= this.params|| {}
		this.timestamp= reqCtx.timestamp= (new Date()).getTime()
		yield next
	}
	Object.defineProperty(pre, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return pre
}

module.exports= pre
