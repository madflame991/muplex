exports.Call = (function () {
	"use strict";
	
	var Closure = require('./Closure.js').Closure;
	var Def = require('./Def.js').Def;
	var VarBinding = require('../VarBinding.js').VarBinding;
	var TokenCoords = require('../../tokenizer/TokenCoords.js').TokenCoords;
	
	function Call(funexp, pexp, tokenCoords) {
		this.funexp = funexp;
		this.pexp = pexp;
		this.tokenCoords = tokenCoords;
	}
	
	Call.prototype.ev = function(env, modSet) {
		var evClos = this.funexp.ev(env, modSet);
		
		//extenral call
		if(evClos instanceof Def) {
			var newEnv = modSet.getEnv(evClos.modName);
			if(!(evClos.fun.pformal === false || this.pexp === false)) {
				var evPexp = this.pexp.ev(env, modSet);
				newEnv = newEnv.con(new VarBinding(evClos.fun.pformal, evPexp, true));
			}
			
			return evClos.fun.body.ev(newEnv, modSet);
		}
	
		//local call
		if(!(evClos instanceof Closure)) throw 'Cannot call a non-function ' + this.tokenCoords;
		
		var envPlusPar;
		if(evClos.fun.pformal === false || this.pexp === false)
			envPlusPar = evClos.env;
		else {
			var evPexp = this.pexp.ev(env, modSet); //evaluate the parameter
			envPlusPar = evClos.env.con(new VarBinding(evClos.fun.pformal, evPexp));
		}
		
		if(evClos.fun.name == false)
			return evClos.fun.body.ev(envPlusPar, modSet);
		else
			return evClos.fun.body.ev(envPlusPar.con(new VarBinding(evClos.fun.name, evClos, true)), modSet);
	};
	
	Call.prototype.accept = function(visitor, state) {
		return visitor.visitCall(this, state);
	};
	
	Call.prototype.toString = function() {
		return '(call ' + this.funexp + '\n' + this.pexp + ')';
	};
	
	return Call;
})();	