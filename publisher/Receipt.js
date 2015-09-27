var
  base= require("../base"),
  classiness= require("insure-classiness")

function Receipt(opts, ctx){
	var self= classiness(this, Receipt, opts)
	base(self, ctx)
	return self
}

Receipt.prototype["@type"]= "push:receipt"

