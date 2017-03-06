var ImgixClient = require('imgix-core-js');
var _  = require('lodash');

function imgixClient(input, options){

    let client = new ImgixClient({
        host: "finanzadomani.imgix.net",
        secureURLToken: "dMjGafWCYDS8yhJR"
    });

    let optionsDefault = {auto: 'format', w: 200, h: 200, fit: 'crop', crop: 'entropy'};

    let optionsOk = _.assign(optionsDefault, options);

    let url = client.buildURL(input, optionsOk);

    return url;

}

module.exports = imgixClient;