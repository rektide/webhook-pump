var
  base= require("../base"),
  classiness= require("insure-classiness")

function Push(opts, ctx){
	if(opts && ctx === undefined){
		ctx= opts
		opts= null
	}
	if(opts && !opts.subscribe){
		opts= {
			subscribe: opts
		}
	}

	var self= classiness(this, Push, opts)
	base(self, ctx)
	self.subscribe= self.subscribe|| opts.subscribe
	return self
}

Push.prototype["@type"]= Push.name.toLowerCase()

