var uuid= require("node-uuid")

function hash(){
	return uuid.v4()
}

module.exports= hash
