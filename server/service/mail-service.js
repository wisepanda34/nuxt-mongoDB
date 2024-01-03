//  server/service/mail-service.js
import nodemailer from 'nodemailer'

const MailService = (to, link)=> {
  const transporter = nodemailer.createTransport({
    host: '',
    port: '',
    secure: false,
    auth: {}
  })

  //функция по отправке ссылки link на имейл to
  const sendActivationMail = async(to, link)=> {
    console.log('sendActivationMail',to,link)
  }
}
export default MailService