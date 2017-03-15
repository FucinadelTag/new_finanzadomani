var _  = require('lodash');

function arrayToString(input, separator){
    'use strict';


    return _.join (input, ',');

}

module.exports = arrayToString;