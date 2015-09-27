var
  _= require("lodash"),
  insureClassiness= require("insure-classiness"),
  uuid= require("node-uuid")

function Context(opts){
	var self= insureClassiness(this, Context, opts)
	self.topics= {}
	self.subscribes= {}
	return self
}

Context.prototype.topics= null
Context.prototype.subscribes= null
Context.prototype.name= "webpushPump"
Context.prototype.idParam= "streamId"
Context.prototype.hash= function hash(){
	return uuid.v4()
}

Context.prototype.add= function(stream){
	var id= this.hash(stream)
	pushExistentialMulti(ctx.pushStreams, id, stream)
	return stream
}
