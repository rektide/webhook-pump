// Inherit Classiness doesn't recurse the prototype chain, so manually apply this instead

var hash= require( "./util/hash")

module.exports= function base(o, reqCtx){
	o.symbol= Symbol()
	o.created= reqCtx.ctx.timestamp|| (new Date()).getTime()
	if( !o.id){
		var
		  _reqHash= reqCtx&& reqCtx.hash
		if( _reqHash){
			_reqHash= _reqHash[ o[ "@type"]]|| _reqHash
			o.id= _reqHash(o, reqCtx)
		}
		var
		  _ctxHash= reqCtx&& reqCtx.ctx&& reqCtx.ctx.hash
		if( !o.id&& _ctxHash){
			o.id= _ctxHash(o, reqCtx)
		}
		if( !o.id){
			o.id= hash(o, reqCtx)
		}
	}
	return o
}
