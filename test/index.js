var test = require('tape')
var either = require('../')
var cont = require('continuable')

var value = {value: 'hello'}

test('#fromArgs', function(t) {
	t.plan(4)

	var c = cont.of(value)
	var e = cont.error('bad')
	
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

test('#safe', function(t) {
	t.plan(4)

	function good() {
		return value
	}
	function bad() {
		throw 'Bad'
	}

	t.equal(either.safe(good)().value, value, 'Captures returns')
	t.equal(either.safe(good)().left, false, 'Captures returns in right')

	t.equal(either.safe(bad)().value, 'Bad', 'Captures throws')
	t.equal(either.safe(bad)().left, true, 'Captures throws in left')
})

test('#fromCb', function(t) {
	t.plan(4)

	var c = cont.of(value)
	var e = cont.error('error')

	either.fromCb(c)(function(ei) {
		t.equal(ei.value, value)
		t.equal(ei.left, false)
	})

	either.fromCb(e)(function(ei) {
		t.equal(ei.value, 'error')
		t.equal(ei.left, true)
	})
})
