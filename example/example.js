var either = require('../')


// # Right values gets acted on
var right = either.of('actOn ')
	.map(addSelf)
	.chain(function(v) { return either.of('Hello ' + v) })

console.log(right.value)
// => 'Hello actOn actOn'



// # Left values shortcuts
var left = either.left('passThrough')
  .map(addSelf)
  .chain(function(v) { return either.of('Hello ' + v) })

console.log(left.value)
// => 'passThrough'



// # Function util
console.log( either.safe(returns)().value )
// => 'Good'

console.log( either.safe(throws)().value )
// => 'Bad'



function addSelf(v) {	return v + v }
function throws() {	throw 'Bad' }
function returns() { return 'Good' }
