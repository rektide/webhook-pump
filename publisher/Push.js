var
  base= require("../base"),
  classiness= require("insure-classiness")

function Push(opts, ctx){
	var self= classiness(this, Push, opts)
	base(self, ctx)
	return self
}

Push.prototype["@type"]= Push.name.toLowerCase()

