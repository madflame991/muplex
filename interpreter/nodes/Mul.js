"use strict";

function Mul(e1, e2) {
	this.e1 = e1;
	this.e2 = e2; 
}

Mul.prototype.ev = function(env, modSet) {
	var e1Ev = this.e1.ev(env, modSet);
	if(!(e1Ev instanceof Num)) throw "Can not multiply non-numbers";
	
	var e2Ev = this.e2.ev(env, modSet);
	if(!(e2Ev instanceof Num)) throw "Can not multiply non-numbers";
	
	return new Num(e1Ev.n * e2Ev.n);
}

Mul.prototype.accept = function(visitor, state) {
	return visitor.visitMul(this, state);
}

Mul.prototype.toString = function() {
	return '(* ' + this.e1 + ' ' + this.e2 + ')';
}