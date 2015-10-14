function routeMaker(){
	var
	  args= Array.prototype.slice.call(arguments, 0)
	function routes(ctx, router){
		if( !router|| !router.get|| !router.put|| !router.post|| !router.delete){
			router= new ( require( "koa-router"))()
		}
		var pre= require( "../pre")
		for( var i= 0; i< args.length; ++i){
			var
			  module= args[i],
			  handler= module( ctx.ctxName),
			  path= ctx.path( handler.path|| handler.name),
			  method= handler.method|| "get"
			if( !path){
				throw new Error("No path found for '"+ handler.name+ "'")
			}
			if( handler.param){
				path= path+ ":"+ handler.param
			}
			router[ method]( path, pre(ctx), handler)
		}
		return router
	}
	return routes
}

module.exports= routeMaker
module.exports.routeMaker= routeMaker
