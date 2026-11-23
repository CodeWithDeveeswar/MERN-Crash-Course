import ejs from "ejs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const currentFilePath = import.meta.url;
const currentDirectory = dirname(fileURLToPath(currentFilePath));

import dotenv from "dotenv";
dotenv.config();

// mail config
const mail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PWD,
  },
});

async function sendPasswordResetLink(email, token, name) {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../template/reset_pwd.ejs`,
      { token, name },
    );

    const mailOption = {
      from: `CodeWithDeveeswar ${process.env.NODEMAILER_USER}`,
      to: email,
      subject: "Password reset link",
      html: renderedContent,
    };

    const verificationInfo = await mail.sendMail(mailOption);
    return verificationInfo;
  } catch (error) {
    return { error };
  }
}

export { sendPasswordResetLink };
