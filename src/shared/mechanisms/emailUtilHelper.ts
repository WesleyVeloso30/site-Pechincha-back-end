import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(
  email: string,
  code: string
) {
  await transporter.sendMail({
    from: `"Meu App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Código de verificação",
    html: `
      <h2>Verifique seu email</h2>
      <p>Seu código é:</p>
      <h1>${code}</h1>
      <p>Esse código expira em 10 minutos.</p>
    `,
  });
}