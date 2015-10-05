function routeMaker(){
	var
	  args= Array.prototype.slice.call(arguments, 0)
	function routes(ctx, router){
		if( !router|| !router.get|| !router.put|| !router.post|| !router.delete){
			router= new ( require( "koa-router"))()
		}
		for( var i= 0; i< args.length; ++i){
			var
			  file= "../"+ arguments[ i],
			  module= require( file),
			  handler= module( ctx.ctxName),
			  path= ctx.path( handler.name)
			if( handler.params){
				path= path+ ":"+ handler.params
			}
			router[ handler.method|| "GET"]( path, handler)
		}
	}
	return routes
}

module.exports= routeMaker
module.exports.routeMaker= routeMaker
