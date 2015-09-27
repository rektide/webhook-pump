function index( ctx, view){
	if( view=== undefined){
		view= function(streams){
			return Object.keys(streams)
		}
	}
	return function* directoryIndex( next){
		var body= ctx.pushStreams
		if( view){
			this.ctx= this.ctx|| {}
			this.ctx[ ctx.name]= ctx
			body= view.call( this, body)
		}
		this.body= body
		yield next
	}
}
module.exports= index
module.exports.index= index
