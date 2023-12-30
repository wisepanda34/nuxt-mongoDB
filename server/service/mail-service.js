import nodemailer from 'nodemailer'

const MailService = ()=> {
  const transporter = nodemailer.createTransport({
    host: '',
    port: '',
    secure: false,
    auth: {}
  })

  //функция по отправки ссылки link на имейл to
  const sendActivationMail = async(to, link)=> {

  }
}
export default MailService