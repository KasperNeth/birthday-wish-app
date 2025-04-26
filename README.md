# birthday-wish-app
Altschool-third-semester-assignment

# Birthday Wish App
This is a simple birthday wish cron-job app which runs exactly 7:00AM everyday. It allows users to register with their `Username`, `Email` and `Dob`. Subscribers to receive birthday wishes via email on their birthday's every year. The app is built using express and nodejs, and it uses Mongodb as the database. With vanilla JavaScript, the app provides a user-friendly interface for subscribers to sign up and receive birthday wishes.


`
# Getting Started
To get started with the app, follow these steps:
1. Clone the repository to your local machine.

```bash
git clone
 https://github.com/KasperNeth/birthday-wish-app.git
```
2. Navigate to the project directory.
```bash
cd birthday-wish-app
```
3. Install the required dependencies.
```bash
npm install
```
4. Create a `.env` file in the root directory and add the following environment variables:
```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
email_password=your_email_password
email_user=your_email_address
```
5. Start the server.
```bash
npm run start
```
6. Open your browser and navigate to `http://localhost:3000` to access the app.
7. You can use Postman or any other API testing tool to test the API endpoints.
8. The app will run a cron job every day at 7:00 AM to send birthday wishes to users who have their birthday on that day.
