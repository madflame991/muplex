"use strict";

function Greater(e1, e2) {
	this.e1 = e1;
	this.e2 = e2;
}

Greater.prototype.ev = function(env) {
	var e1Ev = this.e1.ev(env);
	if(!(e1Ev instanceof Num)) throw "Can not compare non-numbers";
	
	var e2Ev = this.e2.ev(env);
	if(!(e1Ev instanceof Num)) throw "Can not compare non-numbers";
	
	if(e1Ev.n > e2Ev.n) return new Bool(true);
	else return new Bool(false);
}

Greater.prototype.toString = function() {
	return '(> ' + this.e1 + ' ' + this.e2 + ')';
}