var
  assert= require("assert"),
  server= require( "../server")({ port: 8080}),
  spdy= require("spdy"),
  EventWebPush= require( "event-webpush"),
  Subscribe= require("../subscribe/Subscribe"),
  Push= require("../push/Push")

// preload a crafted Subscribe and Push
var subscribe= new Subscribe()
subscribe.id= "magic-subscribe"
server.ctx.accept(subscribe)

var push= new Push({ id: "magic-push", subscribe: subscribe.id})
server.ctx.accept(push)

// create a client, finish server
var spdyAgent= new spdy.createAgent({
  host: "localhost",
  port: 8080,
  ca: server.serverOpts.cert,
  rejectUnauthorized: false
})
spdyAgent.on("error", function(err){
	console.log( "client error", err)
})
server.server.on("error", function(err){
	console.log( "server error", err)
})

// log pushes
EventWebPush.on( "push", function( push){
	push.on( "data", function( data){
		console.log( "data", data)
	})
	push.on( "end", function(){
		console.log( "close")
		//spdyAgent.close()
		//server.close()
	})
})

// subscribe
EventWebPush.request({
  host: "localhost",
  path: "/s/magic-subscribe",
  agent: spdyAgent
}, function( res){
	assert.fail(true, "Request should remain outstanding")
}).on( "error", function(err){
	console.log( "get error", err)
}).end()

// then push
setTimeout(function(){
	EventWebPush.request({
		method: "post",
		host: "localhost",
		path: "/p/magic-push",
		agent: spdyAgent
	}, function( res){
		res.setEncoding("utf8")
		res.on( "data", function( data){
			console.log( "data2", JSON.stringify(res.headers), data)
		})
		res.on( "end", function(){
			console.log( "end2")
		})
	}).on( "error", function( err){
		console.log( "get2 error", err)
	}).end( "console.log(2+2+\"2\");")
}, 2000)
