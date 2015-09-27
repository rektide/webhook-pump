var Router= require("koa-router")

function directory( ctx, indexView, itemView){
	var indx= index( ctx, indexView),
	  itm= item()( ctx, itemView)
	var router= new Router()
	router.post( "/subscribe", subscribe)
	router.get( "/s/:"+ ctx.streamIdParam, s)
	return router.routes()
}
module.exports= directory
