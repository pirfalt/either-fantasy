var test = require('tape')
var either = require('../')
var cont = require('continuable')

var value = {value: 'hello'}
var c = cont.of(value)
var e = cont.error('bad')

test('either.fromArgs', function(t) {
	t.plan(4)
	
	c(function(err, val) {
		var ei = either.fromArgs(arguments)
		t.equal(ei.value, value)
		t.equal(ei.left, false)
	})

	e(function() {
		var ei = either.fromArgs(arguments)
		t.equal(ei.value, 'bad')
		t.equal(ei.left, true)
	})
})