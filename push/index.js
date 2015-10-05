var
  routeMaker= require( "../util/route-maker"),
  p= require("./p"),
  subscribeReply= require( "./subscribeReply")

module.exports= routeMaker( p, subscribeReply)
module.exports.route= module.exports
module.exports.p= p
module.exports.subscribeReply= subscribeReply

module.exports.Push= require( "./Push")
module.exports.pushView= require( "./pushView")
