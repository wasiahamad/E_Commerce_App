import http from "http";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // or 587 for TLS
    service: "gmail", // Uncomment if using a specific email service like Gmail
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // your email username
        pass: process.env.PASSWORD, // your email password
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

const sendEmail = async (to, subject, text, html) => {
    console.log("EMAIL:", process.env.EMAIL);
    console.log("PASSWORD:", process.env.PASSWORD);
    console.log("Sending email to:", to);
    try {
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body

        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};

export { sendEmail };
