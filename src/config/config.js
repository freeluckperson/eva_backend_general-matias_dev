import { config } from 'dotenv'
config()

export default {
    port: process.env.PORT,
    dbNome: process.env.POSTGRES_DB,
    dbUser: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    dbHost: process.env.POSTGRES_HOST,
    dbPort: process.env.POSTGRES_PORT,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    secret: process.env.JWTPASSWORD,
    jwtExpiresIn: process.env.JWTEXPIRES,
    NIUBIZ_URL: "https://apisandbox.vnforappstest.com",
    NIUBIZ_USER: "integraciones@niubiz.com.pe",
    NIUBIZ_PASSWORD: "_7z3@8fF",
    NIUBIZ_MERCHANT_ID: "456879852",
    NIUBIZ_URL_SECURITY: "https://apisandbox.vnforappstest.com/api.security",
    NIUBIZ_URL_ECOMMERCE: "https://apisandbox.vnforappstest.com/api.ecommerce",
    NIUBIZ_URL_TRANSACTION:
      "https://apisandbox.vnforappstest.com/api.authorization",
    URL_PYTHON: "https://r6rnkq1n-3333.brs.devtunnels.ms",

}
