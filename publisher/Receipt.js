var
  hash= require("../util/hash"),
  classiness= require("insure-classiness")

function Receipt(opts, ctx){
	var self= classiness(this, Receipt, opts)
	self.id= self.id|| hash(self)
	self.created= ctx.timestamp
	return self
}

Receipt.prototype["@type"]= "push:receipt"

