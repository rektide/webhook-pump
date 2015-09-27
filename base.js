// Inherit Classiness doesn't recurse the prototype chain, so manually apply this instead

var hash= require("./hash")

module.exports= function base(o, ctx){
	o.symbol= Symbol()
	o.created= ctx.timestamp
	o.id= o.id|| hash(o)
}
