# gulp-mailer

Send emails using `nodemailer` in your gulp builds.

## Usage

```js
var gulp = require('gulp');
var mailer = require('gulp-mailer');

gulp.task('send', function () {
	return gulp.src('emails/*.html')
		.pipe(mailer({
            from: 'nodemailer <sender@example.com>',
            to: ['reciever@example.com']
        }));
});
```
