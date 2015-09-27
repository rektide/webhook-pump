var uuid= require("node-uuid")

module.exports= function hash(){
	return uuid.v4()
}
