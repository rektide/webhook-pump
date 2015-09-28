var
  base= require("../base"),
  classiness= require("insure-classiness")

function Receipt(opts, ctx){
	if(opts && ctx === undefined){
		ctx= opts
		opts= null
	}
	if(opts && !opts.push){
		opts= {
			push: opts
		}
	}

	var self= classiness(this, Receipt, opts)
	base(self, ctx)
	self.push= self.push|| opts.push
	return self
}

Receipt.prototype["@type"]= "push:receipt"
