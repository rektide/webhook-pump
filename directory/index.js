var
  Router= require("koa-router"),
  index= require("./listing"),
  item= require("./item")

function route( ctx, indexView, itemView, router){
	router= router|| new Router()
	var indx= index( ctx, indexView),
	  itm= item()( ctx, itemView)
	router.get( "/", indx)
	router.get( "/:"+ ctx.streamIdParam, itm)
	return router
}

function directoryRouter( ctx, indexView, itemView, router){
	return directory().routes()
}

module.exports= directoryRoutes
module.exports.route= route
