// filepath: d:\E-commerce\Server\utils\sendEmail.js
import { sendEmail } from "./EmailService.js";

const sendEmailFun = async (options) => {
    try {
        const result = await sendEmail(options.to, options.subject, options.text, options.html);
        return result; // return { success: true } or { success: false, error }
    } catch (error) {
        return { success: false, error };
    }
};

export { sendEmailFun };