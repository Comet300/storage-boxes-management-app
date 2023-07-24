const mailjet = require('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        const request = mailjet
            .post("send", {
                'version': 'v3.1'
            })
            .request({
                "Messages": [{
                    "From": {
                        "Email": mailOptions.from,
                    },
                    "To": [{
                        "Email": mailOptions.to,
                    }],
                    "Subject": mailOptions.subject,
                    "HTMLPart": mailOptions.html
                }]
            })
        request
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
    });
}

module.exports = {
    sendEmail
};