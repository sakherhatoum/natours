const nodemailer = require('nodemailer');
const pug =require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Sakher Hatoum <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        if(process.env.NODE_ENV === 'production') {
            // Sendgrid
            return 1;
        }
        return nodemailer.createTransport({
            host : 'sandbox.smtp.mailtrap.io',
            port:  2525,
            auth: {
                user:'3619e0b1d11176',
                pass: 'b701571f5a189e'
            }
            // Activate in gmail "less secure app" option 
        });
    }
    // send the actual email
    async send(template, subject) {
        // 1)Render HTML based on a pug template
        const html = pug.renderFile(
            `${__dirname}/../views/email/${template}.pug`, 
            {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // 2) Define email optinos
        const emailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: html,
           // text: htmlToText.fromString(html)
        }
        // 3) Create a tranport and send email
        await this.newTransport().sendMail(emailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!')
    }

    async sendPasswordReset() {
        await this.send(
            'passwordReset', 
            'Your password reset token (valid for only 10 minutes)'
        );
    }
};