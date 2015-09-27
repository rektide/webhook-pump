/**
  3.  Subscribing for Push Messages
  "A user agent sends a POST request to its configured push service
   resource to create a new subscription."
  Provides a new subscription for the subscriber, 
    and push, push:receipt results to publisher.
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-3
*/

var pushExistential= require("../util/pushExistential")

function subscribe(ctx){
	function subscribe*(next){
		var stream= this.response
		streamId= ctx.add(stream)

		this.ctx= this.ctx|| {}
		var reqCtx= this.ctx[ ctx.name]= this.ctx[ ctx.name]|| {}
		reqCtx.id= streamId
	}
}

module.exports= subscribe
module.exports.subscribe= subscribe
