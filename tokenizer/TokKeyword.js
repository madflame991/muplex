function TokKeyword(s) {
	this.s = s;
}

TokKeyword.prototype.match = function(that) {
	return that === this.s;
}

TokKeyword.prototype.toString = function() {
	return "Keyword(" + this.s + ")";
}

TokKeyword.prototype.toHTML = function(c) {
	return '<span style="color:' + c.keyword + '">' + this.s + '</span>';
}