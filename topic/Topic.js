var
  events= require("events")

function Topic(opts){
	var self= insureClassiness(this, Topic, opt)
	self.subscribers= {}
	return self
}

util.inherit(Topic, events.EventEmitter)

Topic.prototype.subscribers= null

module.exports= Topic
module.exports.Topic= Topic
