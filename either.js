module.exports = Either

function Either(val, left) {
	if (!(this instanceof Either))
		return new Either(val)

	this.left = left
	this.value = val
}

Either.of = Either.Right = function(val) {
	return new Either(val, false)
}

Either.Left = function(val) {
	return new Either(val, true)
}

var p = Either.prototype
p.chain = function(fn) {
	// Should test if fn returns a Either
	return this.left
		? this
		: fn(this.value)
}

p.map = function(fn) {
	return this.left
		? this
		: new Either(fn(this.value))
}

p.join = function() {
	// Should check that this.value is a Either
	return this.left
		? this
		: this.value
}

p.isLeft = function() {
	return this.left ? true : false
}

p.isRight = function() {
	return this.left ? false : true
}
