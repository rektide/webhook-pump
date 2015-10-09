function koa(o){
	o= o|| {}
	o.ctx= o.ctx|| new (require( "./Context"))(o)
	o.koa= o.koa|| require( "koa")()
	o.koa.use( o.ctx.routes())
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
	o.ca= ss.public
	o.cert= ss.cert
	o.key= ss.private
	return o
}

function server(opts){
	var o= {}
	o.serverOpts= opts&& opts.serverOpts|| sign(opts)
	o.ctx= opts&& opts.ctx|| new (require("./Context"))(opts)
	o.koa= opts&& opts.koa|| koa(o)
	o.server= require("spdy").createServer( o.serverOpts, o.koa.callback())
	o.server.listen( opts&& opts.port|| 80)	
	return o
}

if( require.main=== module){
	server()
}

module.exports= server
module.exports.sign= sign
module.exports.koa= koa
module.exports.server= server
