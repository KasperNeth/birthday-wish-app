const {transport} = require("./config")
const { renderTemplate } = require("./template.engine")



const sendMail = async (emailData)=> {

  try {
    const birthdayImageUrls = [
      "https://res.cloudinary.com/dn0txtslw/image/upload/v1745110096/WhatsApp_Image_2025-04-20_at_1.40.35_AM_jitjpb.jpg",
      "https://res.cloudinary.com/dn0txtslw/image/upload/v1745110030/WhatsApp_Image_2025-04-20_at_1.40.37_AM_w0cqbd.jpg",
      "https://res.cloudinary.com/dn0txtslw/image/upload/v1745109988/WhatsApp_Image_2025-04-20_at_1.40.37_AM_1_bzqisz.jpgttps://res.cloudinary.com/your-cloud-name/image/upload/w_600/v1/birthday/gifts.jpg"
    ];
    
    // Select random image
    const birthdayImageUrl = birthdayImageUrls[Math.floor(Math.random() * birthdayImageUrls.length)];
    
    
  const emailHtml  = await renderTemplate("birthday",{username: emailData.username, imageUrl: birthdayImageUrl})
  console.log("📧 Email HTML:", emailHtml);

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

