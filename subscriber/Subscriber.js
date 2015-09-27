var
  hash= require("../util/hash"),
  classiness= require("insure-classiness"),

function Subscribe(opts, ctx){
	var self= classiness(this, Subscriber, opts)
	self.id= self.id|| hash(self)
	self.created= ctx.timestamp
	return self
}

Subscribe.prototype["@type"]= Subscribe.name.toLowerCase()
