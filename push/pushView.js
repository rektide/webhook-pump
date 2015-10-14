var copyHeaders= ["content-type", "content-length"]

function pushView( reqCtx, request){
	var
	  date= (new Date()).toUTCString(),
	  reqHeaders= {
		"cache-control": "private",
		"date": date,
		"last-modified": date
	  },
	  pushHeaders= { "request": reqHeaders }
	for( var i= 0; i< copyHeaders.length; ++i){
		var
		  header= copyHeaders[i],
		  val= request.header[ header]
		if( val!== undefined){
			reqHeaders[ header]= val
		}
	}
	reqCtx.pushHeaders= pushHeaders
	reqCtx.pushCode= 200 // not exposed in node-spdy yet
	reqCtx.pushPath= reqCtx.ctx.path("d")+ reqCtx.d.id
}

module.exports= pushView
module.exports.pushView= pushView
