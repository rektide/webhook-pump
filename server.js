var pre= require("./pre")

function koa(o){
	o= o|| {}
	o.ctx= o.ctx|| new (require( "./Context"))(o)
	o.koa= o.koa|| require( "koa")()
	o.koa.use( require( "./pre")( o.ctx), o.ctx.routes())
	return o.koa
}

function sign(o){
	if( o&& o.key&& o.cert){
		return o
	}
	if( !o){
		o= {}
	}
	if( !o.subj){
		o.subj= "/CN=yoyodyne.net"
	}
	var
	  ss= require("selfsigned").generate(o)
	o.key= ss.private
	o.cert= ss.public
	o.ca= ss.ca
	return o
}

function server(opts){
	var
	  o= {
	  },
	  serverOpts= opts&& opts.serverOptions|| {}

	o.ctx= opts&& opts.ctx|| new (require("./Context"))(opts)
	o.koa= opts&& opts.koa|| koa(o)
	o.server= require("node-spdy").createServer( serverOpts, o.koa.callback())
	o.server.listen( opts&& opts.port|| 80)	
	return o
}

function main(o){
	o= o|| {}
	o.serverOpts= o.serverOpts|| {}
	sign(o.serverOpts)
	server(o)
}

if( require.main=== module){
	main()
}

module.exports= server
module.exports.sign= sign
module.exports.koa= koa
module.exports.server= server
module.exports.main= main
