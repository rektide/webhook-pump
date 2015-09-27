var
  base= require("../base"),
  classiness= require("insure-classiness"),

function Subscribe(opts, ctx){
	var self= classiness(this, Subscriber, opts)
	base(self, ctx)
	return self
}

Subscribe.prototype["@type"]= Subscribe.name.toLowerCase()
