var Router= require("koa-router")

function routes( ctx, indexView, itemView, router){
	var indx= index( ctx, indexView),
	  itm= item()( ctx, itemView)
	router= router|| new Router()
	router.post( "/subscribe", subscribe)
	router.get( "/s/:"+ ctx.streamIdParam, s)
	return router
}
module.exports= directory
