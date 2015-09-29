/**
  5. Requesting Push Message Delivery
  "An application server requests the delivery of a push message by
   sending a HTTP request to a push resource distributed to the
   application server by a user agent.  The push message is included in
   the body of the request"
  https://tools.ietf.org/html/draft-ietf-webpush-protocol-00#section-5
*/

function p( ctxName){
	function *p( next){
	}
	Object.defineProperty( s, "ctxName", {
		get: function(){ return ctxName },
		set: function(val){ ctxName= val },
		enumerable: true
	})
	return p
}

module.exports= p
module.exports.p= p
