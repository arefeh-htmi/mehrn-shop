import mailgun from "mailgun-js";
const mg = mailgun({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const mailgunConfig = (recipient, message) => {
  return new Promise((resolve, reject) => {
    const data = {
      from: `MERN Store! <${process.env.MAILGUN_EMAIL_SENDER}>`,
      to: recipient,
      subject: message.subject,
      text: message.text,
    };

    mg.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};
export { mailgunConfig };
