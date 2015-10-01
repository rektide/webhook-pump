// Inherit Classiness doesn't recurse the prototype chain, so manually apply this instead

var hash= require( "./util/hash")

module.exports= function base(o, opts){
	o.symbol= Symbol()
	o.created= opts.ctx.timestamp
	o.id= o.id|| hash(o)
}
