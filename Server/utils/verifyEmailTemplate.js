const verifyEmailTemplate = ({ username, verificationLink, otp: otp }) => {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 0; }
                    .container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px; }
                    .header { font-size: 24px; color: #333; margin-bottom: 16px; }
                    .content { font-size: 16px; color: #555; margin-bottom: 24px; }
                    .otp-box {
                        background: #f0f0f0;
                        padding: 12px;
                        font-size: 20px;
                        font-weight: bold;
                        color: #000;
                        text-align: center;
                        border-radius: 4px;
                        letter-spacing: 2px;
                        margin-bottom: 24px;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 24px;
                        background: #007bff;
                        color: #fff;
                        border-radius: 4px;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .footer { font-size: 12px; color: #aaa; margin-top: 32px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Verify Your Email Address</div>
                    <div class="content">
                        Hi ${username || 'User'},<br><br>
                        Thank you for registering with our E-commerce app.<br>
                        Please use the OTP below to verify your email address:
                    </div>
                    <div class="otp-box">${otp || '------'}</div>
                    <div class="content">
                        Or you can click the button below to verify:
                    </div>
                    <a href="${verificationLink}" class="button">Verify Email</a>
                    <div class="footer">
                        If you did not create an account, please ignore this email.<br>
                        &copy; ${new Date().getFullYear()} E-commerce App
                    </div>
                </div>
            </body>
        </html>
    `;
};

export default verifyEmailTemplate;
