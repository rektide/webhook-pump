var
  routeMaker= require("../util/route-maker"),
  subscribe= require("./subscribe"),
  s= require("./s"),
  d= require("./d")

module.exports= routeMaker(subscribe, s, d)
module.exports.route= module.exports
module.exports.subscribe= subscribe
module.exports.s= s
module.exports.d= d

module.exports.Subscribe= require("./Subscribe")
module.exports.S= require("./S")
module.exports.D= require("./D")
