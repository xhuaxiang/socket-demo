/**
 *  日期时间
 *
 */
/**
 * 转为时间戳
 * @param date 时间日期
 **/
export const getTimeStamp = date => {
	return new Date(date).getTime();
}

/**
 * 转为规定时间格式
 * @param stamp 时间戳
 * @param format 时间格式
**/
export const turnTime = (stamp, format) => {
	if (!/^\d+$/.test(stamp)) {
		return;
	}
	let date = new Date(stamp);
	let year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			min = date.getMinutes(),
			sec = date.getSeconds();
	month = month > 10 ? month : `0${month}`;
	day = day > 10 ? day : `0${day}`;
	hour = hour > 10 ? hour : `0${hour}`;
	min = min > 10 ? min : `0${min}`;
	sec = sec > 10 ? sec : `0${sec}`;
	switch (format) {
		case 'YY-MM-DD HH:MM:SS':
			return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
		case 'YY-MM-DD':
			return `${year}-${month}-${day}`;
		case 'YY/MM/DD HH:MM:SS':
			return `${year}/${month}/${day} ${hour}:${min}:${sec}`;
		case 'YY/MM/DD':
			return `${year}/${month}/${day}`;
	}
}

/**
 * @ 获取日期
 * @ format 日期格式 (-或者/或者.) 三种格式
 * @ isDouble 0的前置 (可选)
 */
export const getDate = function (format = 'YYYY-MM-DD', isDouble = true) {
	let _date = new Date();
	let _year = _date.getFullYear();
	let _month = _date.getMonth() + 1;
	let _day = _date.getDate();
	if (isDouble) {
		_month = _month >= 10 ? `${_month}` : `0${_month}`;
		_day = _day >= 10 ? `${_day}` : `0${_day}`
	}
	switch (format) {
		case 'YYYY.MM.DD':
			return `${_year}.${_month}.${_day}`;
		case 'YYYY-MM-DD':
			return `${_year}-${_month}-${_day}`;
		case 'YYYY/MM/DD':
			return `${_year}/${_month}/${_day}`;
	}
}

/**
 * @ 获取任一月份的天数
 * @ month 月份字符串
 * @ year 年份
 */
export const getDayNum = function (month, year) {
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			return 31;
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2: 
			if (+year%4 === 0) {
				return 29;
			} else {
				28;
			}
		default: 
			return false;
	}
}


/**
 *  数字计算，处理
 *
 **/
//数字处理
//千分符,取余处理
export const SplitNum = (num, length = 2) => {
	/**let reg = /^(\'|\")?\d+(.)?\d+(\'|\")?$/g
	if (!reg.test(num)) {
		return false
	}**/
	if (!parseInt(num)) {
		return
	}
	num = Number(num).toFixed(length)
	return String(num).replace(/\d{1,3}(?=(\d{3})(.\d+)+$)/g, '$1,')
}

//数字隐藏(*号隐藏)
export const hideNum = (str, start, end) => {
	if (typeof str !== 'string') {
		return false
	}
	let replaceSymbol = ''
	for (let i = 0; i < str.length - start - end; i++) {
		replaceSymbol += '*'
	}
	let _str = `^(\\w{${start}})\\w+(\\w{${end}})$`
	let reg = new RegExp(_str)
	return str.replace(reg, '$1'+replaceSymbol+'$2')
}

//除法计算
export const division = () => {
	
}

// 防抖
export const debounce = (fn, wait) => {
	let time = null;
	return function () {
		clearTimeout(time);
		time = setTimeout(() => {
			fn.call(this, arguments)
		}, wait)
	}
}

// 节流
export const throttle = (fn, wait) => {
	let run = true;
	return function () {
		if (!run) {
			return;
		}
		run = false;
		setTimeout(() => {
			fn.call(this, arguments);
			run = true;
		}, wait);
	}
}









