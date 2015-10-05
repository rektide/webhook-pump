var pre= require("./pre")

function koa(o){
	o= o|| {}
	o.ctx= o.ctx|| new require( "./Context")
	o.koa= o.koa|| require( "koa")()
	o.koa.use( require( "./pre")( o.ctx), o.ctx.routes())
	return o
}

function server(opts){
	var
	  o= {
	  },
	  serverOpts= opts&& opts.serverOptions|| {}

	o. ctx= opts&& opts.ctx|| new (require("ctx"))(opts)
	o.koa= opts&& opts.koa|| koa(o)
	o.server= require("node-spdy").createServer( serverOpts, o.koa.callback())
	o.server.listen( opts&& opts.port|| 80)	
	return o
}

module.exports= server
module.exports.server= server
module.exports.koa= koa
