import React from 'react';
//import en from './lang/en';
//import id from './lang/id';

export const addDot = (str) => {
	if(str.length > 3) {
		str = str.slice(0, -3) + '.' + str.slice(-3);
		if(str.length > 7) {
			str = str.slice(0, -7) + '.' + str.slice(-7);
			if(str.length > 11) {
				str = str.slice(0, -11) + '.' + str.slice(-11);
			}
		}
	}
	return str;
}

export const parseDateTime = (date) => {
	date = String(date).split(' ');
	var days = String(date[0]).split('-');
	var hours = String(date[1]).split(':');
	return days[2] + '-' + days[1] + '-' + days[0] + ' ' + hours[0] + ':' + hours[1];
}

export const parseDate = (date) => {
	date = String(date).split(' ');
	var days = String(date[0]).split('-');
	return days[2] + '-' + days[1] + '-' + days[0];
}

export const validateEmail = (text) => {
	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
	if(reg.test(text) === false) {
		//console.log("Email is Not Correct");
		return false;
	} else {
		return true;
	}
}

/*
export const i18n = (lang, screen, str) => {
	let word = '';
	switch(lang) {
		case 'en':
			word = en[screen][str];
			break;
		case 'id':
			word = id[screen][str];
			break;
	}
	return word;
}
*/