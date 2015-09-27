function pushExistential(o, slot, val){
	var arr= o[slot]
	if(!arr)
		arr= o[slot]= [val]
	}else{
		arr.push(val)
	}
	return arr
}

function pushExistentialMulti(o, slots, va){
	if(typeof slot === "string"){
		pushExistential(o, slots, val)
		return
	}
	for(var i= 0; i< slots.length; ++i){
		pushExistential(o, slots[i], val)
	}
}

module.exports= pushExistential
module.exports.pushExistential= pushExistential
module.exports.pushExistentialMulti= pushExistentialMulti
