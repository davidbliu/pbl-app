// ROOT_URL = 'http://testing.berkeley-pbl.com';
ROOT_URL = 'http://localhost:3000';
token = '6461766964626c697540676d61696c2e636f6d';
email = 'davidbliu@gmail.com';

function tokenizedURL(url){
    if(url.indexOf('?') != -1){
        tokenized = url + '&token='+token;
    }
    else{
        tokenized =  url + '?token='+token;
    }
    return tokenized;
}

/**
* Tabling Utils
*/
function timeToString(time){
	return dayString(time) + " at "+hourString(time);
}
function hourString(time){
	t = (time % 24) % 12;
	if(t==0){
		t = 12;
	}
	return t.toString()+':00';
}
function dayString(time){
	days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	return days[Math.floor(time / 24)];
}