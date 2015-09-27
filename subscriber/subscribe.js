/**
  3.  Subscribing for Push Messages
  "A user agent sends a POST request to its configured push service
   resource to create a new subscription."
  Provides a new subscription for the subscriber, 
    and push, push:receipt results to publisher.
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-3
*/

var
  Subscribe= require("./Subscribe"),
  Push= require("../publisher/Push"),
  Receipt= require("../publisher/Receipt")

function subscribe(ctx){
	function subscribe*(next){
		var
		  _subscribe= new Subscribe(),
		  _push= new Push(),
		  _receipt= new Receipt()
		this.app[ ctx.name]= {
			subscribe: _subscribe,
			push: _push,
			receipt: _receipt
		}
		this.res.set( "Location": _subscribe.id)
		yield next
	}
}

module.exports= subscribe
module.exports.subscribe= subscribe
