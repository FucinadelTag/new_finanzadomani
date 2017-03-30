var Busboy = require('busboy'),
    bytes = require('bytes'),
    concat = require('concat-stream'),
    HARDLIMIT = bytes('250mb');

module.exports = function (settings) {

    settings = settings || {};
    settings.limit = settings.limit || HARDLIMIT;
    settings.multi = settings.multi || false;

    if (typeof settings.limit === 'string') {
        settings.limit = bytes(settings.limit);
    }

    if (settings.limit > HARDLIMIT) {
        console.error('WARNING: busboy-body-parser file size limit set too high');
        console.error('busboy-body-parser can only handle files up to ' + HARDLIMIT + ' bytes');
        console.error('to handle larger files you should use a streaming solution.');
        settings.limit = HARDLIMIT;
    }

    return function multipartBodyParser(req, res, next) {

        if (req.is('multipart/form-data')) {
            var busboy;
            try {
                busboy = new Busboy({
                    headers: req.headers,
                    limits: {
                        fileSize: settings.limit
                    }
                });
            } catch (err) {
                return next(err);
            }
            busboy.on('field', function (key, value) {
                req.body[key] = value;
            });
            busboy.on('file', function (key, file, name, enc, mimetype) {
                file.pipe(concat(function (d) {
                    let fileSize = null;
                    if (d.length > 0){
                        fileSize = Buffer.byteLength(d, 'binary')
                    }
                    else {
                        fileSize = null
                    }

                    var fileData = {
                        data: file.truncated ? null : d,
                        name: name,
                        encoding: enc,
                        mimetype: mimetype,
                        truncated: file.truncated,
                        size: fileSize
                    };


                    if (settings.multi) {
                        req.files[key] = req.files[key] || [];
                        req.files[key].push(fileData);
                    } else {
                        req.files[key] = fileData;
                    }
                }));
            });
            var error;
            busboy.on('error', function (err) {
                error = err;
                next(err);
            });
            busboy.on('finish', function () {
                if (error) { return; }
                next();
            });
            req.files = req.files || {};
            req.body = req.body || {};
            req.pipe(busboy);
        } else {
            next();
        }

    };

};
