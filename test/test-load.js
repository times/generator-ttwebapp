/*global describe, beforeEach, it*/
'use strict';

var assert = require('assert');

describe('ttwebapp generator', function () {
    it('can be imported without blowing up', function () {
        var app = require('../app');
        assert(app !== undefined);
    });
});
