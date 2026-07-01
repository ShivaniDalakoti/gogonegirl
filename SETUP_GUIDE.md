# Gone Girl Backend Setup Guide

## 📧 Email Integration with Excel Attachments

This guide will help you set up Gmail email notifications with Excel attachments for form submissions.

---

## Step 1: Gmail App Password Setup

1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Go back to Security, find **App Passwords** (appears only if 2FA is on)
5. Select **Mail** and **Windows Computer** (or your device)
6. Google will generate a 16-character password
7. **Copy this password** - you'll need it next

---

## Step 2: Create .env File

1. In the `gogonegirl` folder, create a new file called `.env`
2. Add the following content:

```env
GMAIL_USER=gogonegirl@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
PORT=5000
```

3. Replace `xxxx xxxx xxxx xxxx` with the 16-character App Password you got from Step 1
4. **Save the file** (make sure it's named `.env`, not `.env.txt`)

---

## Step 3: Install Dependencies

Open Terminal/Command Prompt in the `gogonegirl` folder and run:

```bash
npm install
```

This installs all required packages (Express, Nodemailer, ExcelJS, etc.)

---

## Step 4: Start the Server

Run this command to start the backend:

```bash
npm start
```

You should see:
```
🚀 Gone Girl Server Running!
📍 Server: http://localhost:5000
📧 Email: gogonirl@gmail.com → shivaniinavihs96@gmail.com
🔧 Test email: GET http://localhost:5000/api/test-email
```

---

## Step 5: Test Email Configuration

Open your browser and go to:
```
http://localhost:5000/api/test-email
```

You should get a response like:
```json
{
  "success": true,
  "message": "Test email sent successfully to shivaniinavihs96@gmail.com"
}
```

Check your email at `shivaniinavihs96@gmail.com` - you should receive a test email!

---

## Step 6: Test Form Submission

1. Open http://localhost:5000 in your browser
2. Fill out the contact form with test data
3. Click "Send My Message"
4. You should see: ✓ Message sent! We'll be in touch soon.
5. Check your email - you should receive an email with an Excel attachment

---

## File Structure

```
gogonegirl/
├── index.html              (Updated with new form handler)
├── server.js               (Backend server)
├── package.json            (Dependencies)
├── .env                    (Gmail credentials - CREATE THIS)
├── .env.example            (Template for .env)
└── SETUP_GUIDE.md         (This file)
```

---

## Excel File Details

The generated Excel file includes:
- ✅ Submission Date & Time
- ✅ First Name
- ✅ Last Name
- ✅ Email Address
- ✅ Dream Destination
- ✅ Message

---

## Troubleshooting

### Error: "GMAIL_PASSWORD is not defined"
→ Make sure you created `.env` file with the correct App Password

### Error: "Cannot find module 'express'"
→ Run `npm install` first

### Email not sending
→ Check that:
1. App Password is correct (16 characters with spaces)
2. 2-Factor Authentication is enabled on your Google Account
3. Gmail is not blocking the connection
4. Server is running without errors

### "Invalid login" error
→ Use the 16-character **App Password**, not your regular Google password

---

## Going Live (Deployment)

When you deploy to a live server:

1. Set environment variables on your hosting platform (not in .env file)
2. Use the same Gmail credentials
3. Update the form endpoint if needed
4. Ensure Node.js and npm are installed on the server

**Popular hosting options:**
- Heroku (free tier available)
- Railway
- Render
- DigitalOcean

---

## Support

For issues, check:
1. Browser console (F12) for JavaScript errors
2. Terminal output for server errors
3. Spam/Promotions folder in Gmail (in case email is filtered)

---

**✅ Setup complete! Your Gone Girl website is now sending form submissions with Excel attachments!** 🎉
