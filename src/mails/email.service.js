const {transport} = require("./config")
const { renderTemplate } = require("./template.engine")



const sendMail = async (emailData)=> {

  try {

    
  const emailHtml  = await renderTemplate({username: emailData.username})

  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: emailData.email,
    subject: `Happy Birthday ${emailData.username}`,
    html: emailHtml
  })
  console.log("✅ Email sent to:", emailData.email);


  }catch(error){
    console.error("❌ Error sending email:", error.message);
    throw new Error("Error sending email")

  }

}

module.exports = {
  sendMail
}

