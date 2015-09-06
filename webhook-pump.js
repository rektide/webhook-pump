function WebhookPump(events, opts){
	function *webhookPumper(next){
		this.webhookPump= webhookPumper.webhookPump
		if(this.isSpdy){
			
		}
	}

	if(events && !opts){
		if(events.events){
			opts= events
		}else{
			opts= {events: events}
		}
	}else if(events){
		opts.events= events
	}
	webhookPumper.webhookPump= opts

	return webhookPumper
}
