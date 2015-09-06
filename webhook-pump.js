function WebhookPump(webhookPumpSource, opts){
	function *webhookPumper(next){
		this.webhookPump= webhookPumper.webhookPump
		if(this.isSpdy){
			
		}
	}

	if(webhookPumpSource && !opts){
		if(webhookPumpSource.addListener){
			webhookPumper.webhookPumpSource= webhookPumpSource
		}else{
			opts= webhookPumpSource
			webhookPumpSource= null
		}
	}
	webhookPumpSource.webhookPump= opts

	return webhookPumper
}
