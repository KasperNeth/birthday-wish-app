const {subscriberModel}  =  require("../models/subscribers.model")
const {sendMail} = require("../mails/email.service")



const subscriberService = async (data) => {
  const {username, email, dateOfBirth} = data

  const existingSubscriber = await subscriberModel.findOne({$or:[{email}]})
  if(existingSubscriber){
    return{
      success: false,
      data: `Yo! ${username} 😅 be calm you are already a subscriber to our birthday wish list sevice!`,
      code: 409
    }
  }
  
  try {
    const subscriber = await subscriberModel.create({
      username,
      email,
      dateOfBirth
    })
    return {
      success: true,
      code: 201,
      data: `Thanks for subscribing to our birthday wish list ${subscriber.username}, we will send you a birthday wish on your birthday`,
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
      code: 500
    }
  }



}


const processTodayBirthdays = async () => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1; // Months are 0-indexed in JavaScript
    const day = today.getDate();
              
    const subscriberUsers = await subscriberModel.find({
      $expr: {
        $and: [
          { $eq: [{ $month: '$dateOfBirth' }, month] },
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, day] },
        ],
      },
    });
    
    if(!Array.isArray(subscriberUsers) || subscriberUsers.length === 0){
      console.log("⚠ No subscribers found with birthdays today.");
      return {
        success: false,
        message: "No subscribers found for today",
        code: 404
      }
    }
      
    // Send birthday wishes to each subscriber
    console.log(`📡 Found subscribers: ${subscriberUsers.length}`);
            
    const results = {
      success: true,
      code: 200,
      total: subscriberUsers.length,
      sent: 0,
      failed: 0,
      subscribers: []
    };
    
    for (const subscriber of subscriberUsers) {
      try {
        await sendMail(subscriber);
        results.sent++;
        results.subscribers.push(subscriber.email);
      } catch (error) {
        console.error(`❌ Failed to send email to ${subscriber.email}: ${error.message}`);
        results.failed++;
      }
    }
    
    console.log(`✅ Birthday wishes sent to ${results.sent} subscribers`);
    results.message = `Processed ${results.total} birthdays: ${results.sent} emails sent, ${results.failed} failed`;
    return results;
          
  } catch (error) {
    console.log(`Error fetching subscribers: ${error}`);
    return {
      success: false,
      code: 500,
      message: "Error fetching subscribers",
      error: error.message
    };
  }
};


module.exports = {
  subscriberService,
  processTodayBirthdays
};


