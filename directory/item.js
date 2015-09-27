function item( ctx, view){
	return function* directoryItem( next){
		var id= this.params[ ctx.streamIdParam]
		if( !id){
			yield next
			return
		}

		var body= ctx.pushStreams[ id]
		if(view){
			this.ctx= this.ctx|| {}
			this.ctx[ ctx.name]= ctx
			body= view.call( this, body)
		}
		this.body= body
		yield next
	}
}
module.exports= routedItem
module.exports.item= item
module.exports.routedItem= routedItem
