var
  hash= require("../util/hash"),
  classiness= require("insure-classiness")

function Push(opts, ctx){
	var self= classiness(this, Push, opts)
	self.id= self.id|| hash(self)
	self.created= ctx.timestamp
	return self
}

Push.prototype["@type"]= Push.name.toLowerCase()

