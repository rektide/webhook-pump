var
  routeMaker= require( "../util/route-maker"),
  receipt= require( "./receipt"),
  r= require( "./r"),
  subscribeReply= require( "./subscribeReply")

module.exports= routeMaker( receipt, r, subscribeReply)
module.exports.route= module.exports
module.exports.receipt= receipt
module.exports.r= r
module.exports.subscribeReply= subscribeReply

module.exports.Receipt= require( "./Receipt")
module.exports.R= require( "./R")
