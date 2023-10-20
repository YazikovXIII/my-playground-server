const nodemailer = require("nodemailer");
const { SMTP_USER, NODEMAILER_E_KEY } = process.env;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_USER,
        pass: NODEMAILER_E_KEY,
      },
    });
  }
  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to,
        subject: `Email verification`,
        html: `<a href="${link}">${link}</a>`,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MailService();
