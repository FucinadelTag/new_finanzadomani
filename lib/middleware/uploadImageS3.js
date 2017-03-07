var AWS  = require ('aws-sdk');

AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: 'finanzadomani.immagini'}
});

exports.uploadImageS3 = function(req, res, next) {

    if (typeof req.files != 'undefined') {

        console.log (req.files);

        if (req.files.immagine.name != '') {

            let uniqid = Date.now();

            var imageData = req.files.immagine;

            const imageDataName = uniqid +'_'+ imageData.name;

            req.body.immagine = imageDataName;

            s3.putObject({
                Body: imageData.data,
                Key: imageDataName,
                ACL: 'public-read'
            }, function(error, data) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("success uploading to s3");
                }
            });

        }
    } else {
        delete req.body.immagine;
    }

    next ();



};

