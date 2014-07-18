var _ = require('underscore');
var nodemailer = require('nodemailer');
var path = require('path');
var through2 = require('through2');
var util = require('util');
var gutil = require('gulp-util');

module.exports = function (options) {
    options = _.defaults(options || {}, {
        to: [],
        from: 'nodemailer <sender@example.com>',
        subject: null,
        html: null,
        text: null
    });
    var transporter = nodemailer.createTransport(
        options.transporter || { service: 'sendmail' }
    );
    return through2.obj(function (file, enc, next) {
        if (file.isNull()) {
            this.push(file);
            return next();
        }
        var to = options.to.join(',');
        var subject = options.subject || _subjectFromFilename(file.path);
        return transporter.sendMail({
            from: options.from,
            to: to,
            subject: subject,
            html: file.contents.toString()
        }, function (error, info) {
            if (error) {
                console.error(error);
                return next();
            }
            gutil.log('Send email', gutil.colors.cyan(subject), 'to',
                      gutil.colors.red(to));
            next();
        });
    });
};

_subjectFromFilename = function (filename) {
    var name = path.basename(filename).replace(path.extname(filename), '');
    return util.format('[TEST] %s', name);
};
