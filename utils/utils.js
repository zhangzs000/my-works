function formatData(date, fmt){
	date = date? new Date(date) : new Date();
	fmt = fmt? fmt : 'yy-MM-dd hh:mm';
	o = {
		'M+': date.getMonth() + 1,
	    'd+': date.getDate(),
	    'h+': date.getHours(),
	    'm+': date.getMinutes(),
	    's+': date.getSeconds()
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').slice(4 - RegExp.$1.length))
	} 

	for (key in o) {
		var reg = new RegExp('('+key+')')
		fmt = fmt.replace(reg, function(){
			return o[key] < 10? '0'+o[key] : o[key];
		})
	}

	return fmt;
}