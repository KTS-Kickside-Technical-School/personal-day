import nodemailer from "nodemailer";
import { config } from "dotenv"

config()

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_HOST_PORT),
    secure: true,
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PW
    }
});



export const sendEmail = async (email, subject, message) => {
    try {
        const mailOptionsVerify = {
            from: process.env.MAIL_ID,
            to: email,
            subject: subject,
            text: message
        };

        await transporter.sendMail(mailOptionsVerify);
    } catch (error) {
        throw new Error(error);
    }
};
