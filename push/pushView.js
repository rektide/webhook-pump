var copyHeaders= ["content-type", "content-length"]

function pushView( reqHeaders, dId, deleteBase, o){
	o= o|| {}
	var
	  resourcePath= reqHeaders["Location"],
	  date= (new Date()).toUTCString(),
	  pushHeaders= {
		"cache-control": "private",
		"date": date,
		"last-modified": date
	  }
	for( var i= 0; i< copyHeaders.length; ++i){
		var
		  header= copyHeaders[ i],
		  val= reqHeaders[ header]
		if( val!== undefined){
			pushHeaders[ header]= val
		}
	}
	if( !o.deletePath&& dId){
		o.deletePath= o.deletePath|| (deleteBase+ dId)
	}
	if( resourcePath){
		o.resourcePath= resourcePath
	}else if( o.deletePath){
		o.resourcePath= o.deletePath
	}else{
		throw new Error("Push path error")
	}
	o.headers= { request: pushHeaders }
	o.statusCode= 200 // not exposed in node-spdy yet
	return o
}

module.exports= pushView
module.exports.pushView= pushView
