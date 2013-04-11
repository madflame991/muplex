"use strict";

function Pair(e1, e2) {
	this.e1 = e1;
	this.e2 = e2; 
}

Pair.prototype.ev = function(env) {
	var e1Ev = this.e1.ev(env);
	var e2Ev = this.e2.ev(env);
	return new Pair(e1Ev, e2Ev);
}

Pair.prototype.toString = function() {
	return '[' + this.e1 + ' ' + this.e2 + ']';
}