var _  = require('lodash');

function json_encode(input, options){

    let inputOk =  _.replace (input, "\\\"", "\"");
    let jsonInput = JSON.parse(inputOk);

    return jsonInput;

}

module.exports = json_encode;