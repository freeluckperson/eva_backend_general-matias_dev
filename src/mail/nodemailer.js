import nodemailer from 'nodemailer';
import config from '../config/config';

export const transport = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
    }



});


