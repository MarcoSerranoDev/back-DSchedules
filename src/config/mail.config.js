import nodemailer from "nodemailer";
import {
  NODEMAILER_HOST,
  NODEMAILER_PORT,
  NODEMAILER_PASS,
  NODEMAILER_USER,
} from "../config";

let transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST,
  port: NODEMAILER_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: NODEMAILER_USER, // generated ethereal user
    pass: NODEMAILER_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: `Hermes Music MKT <${NODEMAILER_USER}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      html, // html body
    });
  } catch (error) {
    console.log("Algo no va bien con el email", error);
  }
};

export const getTemplate = (name, horario) => {
  return `
        <div id="email___content">
            <h2>Hola ${name}</h2>
            <p>Has reservado tu prueba para el controlador DJ</p>
            <span>Fecha: 15-marzo-2023</span>
            <span>Horario: ${horario}</span>
        </div>
      `;
};
