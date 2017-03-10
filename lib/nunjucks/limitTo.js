var _  = require('underscore');
var lodash  = require('lodash');

function limitTo(input, start, end){
    'use strict';

    let inputClone = _.clone(input);

    return lodash.slice (inputClone, start, end);

}

module.exports = limitTo;