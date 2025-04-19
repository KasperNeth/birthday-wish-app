
module.exports = (data) => {
  // Default values if not provided in data
  const username = data.username || 'Friend';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Happy Birthday ${username}!</title>
  <style>
    /* Base styles for email client compatibility */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f9f9f9;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    .header {
      background: linear-gradient(135deg, #ff7e5f, #feb47b);
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 32px;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    }
    
    .content {
      padding: 30px 40px;
      background-color: #ffffff;
    }
    
    .birthday-image {
      width: 100%;
      max-width: 520px;
      height: auto;
      border-radius: 10px;
      margin: 20px 0;
    }
    
    .message {
      font-size: 18px;
      line-height: 1.6;
      color: #444444;
      margin-bottom: 25px;
    }
    
    .personal-note {
      font-style: italic;
      color: #666666;
      margin-bottom: 30px;
      padding: 15px;
      background-color: #f9f8f3;
      border-left: 4px solid #feb47b;
    }
    
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eeeeee;
      font-weight: bold;
      color: #555555;
    }
    
    .footer {
      background-color: #f0f0f0;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #777777;
      border-radius: 0 0 8px 8px;
    }
    
    .social-links {
      margin: 15px 0;
    }
    
    .social-links a {
      display: inline-block;
      margin: 0 10px;
      color: #ff7e5f;
      text-decoration: none;
      font-weight: bold;
    }
    
    @media only screen and (max-width: 480px) {
      .content {
        padding: 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
      
      .message {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Happy Birthday, ${username}! 🎉</h1>
    </div>
    
    <div class="content">
      <img src="https://via.placeholder.com/600x300?text=Birthday+Celebration" alt="Birthday Celebration" class="birthday-image">
      
      <div class="message">
        <p>Dear ${username},</p>
        <p>On this special day, we want to celebrate <strong>YOU</strong>! Another journey around the sun completed, another year of wonderful memories, growth, and achievements.</p>
        <p>Birthdays are nature's way of telling us to eat more cake! We hope your day is filled with laughter, love, and of course, delicious cake.</p>
      </div>
      
      <div class="personal-note">
        May this new year of your life bring you endless joy, exciting opportunities, and beautiful moments to cherish. You deserve all the happiness in the world today and always.
      </div>
      
      <div class="message">
        <p>We've prepared something special just for you. Make sure to check your notifications for a birthday surprise!</p>
        <p>Wishing you health, wealth, and happiness in abundance.</p>
      </div>
      
      <div class="signature">
        With warm wishes,<br>
        The Team
      </div>
    </div>
    
    <div class="footer">
      <div class="social-links">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
      </div>
      <p>© 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};