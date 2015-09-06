function WebhookPump(events, opts){
	function *webhookPumper(next){
		var opts= webhookPumper.opts
		this[opts.slotName]= opts
		if(this.isSpdy){
			opts.clients.push(this)
		}
		yield next
	}

	if(events && !opts){
		if(events.events){
			opts= events
		}else{
			opts= {events: events}
		}
	}else if(events){
		opts.events= events
	}else{
		opts= {}
	}
	webhookPumper.opts= opts

	if(!opts.slotName){
		opts.slotName= "webhookPump"
	}
	if(!opts.clients){
		opts.client= []
	}
	if(!opts.eventName){
		opts.eventName= 'data'
	}
	if(!opts.listener){
		if(!opts.normalize){
			if(!opts.basePath){
				opts.basePath= "/"
			}
			opts.normalize= function normalize(val){
				if(val instanceof Object){
					if(val.body){
						val.headers= val.headers || {}
						if(val.body instanceof Object){
							val.headers["content-type"]= val.headers["content-type"] || "application/json"
							val.body= JSON.stringify(val.body)
						}else{
	
							val.headers["content-type"]= val.headers["content-type"] || "text/plain"
							val.body = val.body
						}
					}else if(val instanceof String){
						val= {
							headers: {"content-type": "text/plain"},
							body: val
						}
					}else if(val){
						val= {
							headers: {"content-type": "application/json"},
							body: JSON.stringify(val)
						}
					}
	
				}else if(val instanceof String){
					val= {
						headers: {"content-type": "text/plain"},
						val: val
					}
				}
				if(!val.path){
					val.path= opts.basePath
				}
				if(!val.priority){
					val.priority= 5
				}
				return val
			}
		}

		opts.listener= function webhookPumpListener(e){
			var opts= webhookkPumper.opts,
			  render= opts.render,
			  val= render && render.perClient !== true && render.call(null, opts, e) || e
			val= opts.normalize(val)
			for(var i in opts.clients){
				var client= opts.clients[i],
				  clientVal= val
				if(client.render){
					clientVal= client.render(e, opts, val)
					clientVal= opts.normalize(clientVal)
				}else if(render && (render.perClient || client.perClient)){
					clientVal= render.call(client, e, opts, val)
					clientVal= opts.normalize(clientVal)
				}
				client.push(clientVal)
			}
		}
	}

	var events= opts.events
	Object.defineProperty(opts, "events", {
		get: function(){
			return webhookPumper.opts.events
		},
		set: function(val){
			var opts= webhookPumper.opts
			if(val === opts.events){
				return
			}
			if(opts.removeOnSwitch)
				opts.events.removeListener(opts.eventName, opts.listener)
			opts.events= val
			if(opts.events){
				opts.events.on(opts.eventName, opts.listener)
			}
		},
		enumerable: true
	})
	opts.events= events

	return webhookPumper
}

module.exports= WebhookPump
