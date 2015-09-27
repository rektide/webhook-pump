var
  time= require("util/time")

function pre(ctx){
	return function *pre( next){
		var app= this.app
		if( !app){
			app= this.app= {}
		}
		var reqCtx= app[ ctx.name]
		if( !reqCtx){
			reqCtx= app[ ctx.name]= {ctx: ctx}
		}
		this.timestamp= reqCtx.timestamp= (new Date()).getTime()
		yield next
	}
}

module.exports= pre
