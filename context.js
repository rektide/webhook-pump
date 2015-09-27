var
  _= require("lodash"),
  insureClassiness= require("insure-classiness"),
  uuid= require("node-uuid")

function Context(opts){
	var self= insureClassiness(this, Context, opts)
	self.subscribers= new events.EventEmitter()
	self.publishers= new events.EventEmitter()
	return self
}

Context.prototype.subscribers= null
Context.prototype.publishers= null
Context.prototype.name= "webpushPump"
Context.prototype.idParam= "streamId"
Context.prototype.hash= function hash(){
	return uuid.v4()
}
