var
  time= require("./util/time")

function pre(ctx){
	function *pre( next){
		var app= this.app
		if( !app){
			app= this.app= {}
		}
		var reqCtx= app[ ctx.ctxName]
		if( !reqCtx){
			reqCtx= app[ ctx.ctxName]= {ctx: ctx}
		}
		this.timestamp= reqCtx.timestamp= (new Date()).getTime()
		yield next
	}
	Object.defineProperty(pre, "ctx", {
		get: function(){ return ctx},
		set: function(val){ ctx= val },
		enumerable: true
	})
	return pre
}

module.exports= pre
