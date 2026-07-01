# Google Sheets Integration Setup Guide

This guide will help you connect your Gone Girl contact form to Google Sheets and Gmail.

---

## Step 1: Create Google Cloud Project & Get Credentials

### 1.1 Create a Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Click the project dropdown at the top
3. Click **NEW PROJECT**
4. Enter project name: `Gone Girl`
5. Click **CREATE**
6. Wait for the project to be created, then select it

### 1.2 Enable Google Sheets API
1. In the left menu, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and press **ENABLE**
4. A notification will appear saying "To use this API, you may need credentials"

### 1.3 Create Service Account
1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** at the top
3. Select **Service Account**
4. Fill in:
   - Service account name: `gone-girl-form`
   - Click **CREATE AND CONTINUE**
5. On "Grant this service account access to project" → Click **CONTINUE**
6. On "Grant users access to this service account" → Click **DONE**

### 1.4 Create & Download JSON Key
1. You'll see your service account listed
2. Click on the email (e.g., `gone-girl-form@...iam.gserviceaccount.com`)
3. Go to the **KEYS** tab
4. Click **ADD KEY** → **Create new key**
5. Choose **JSON**
6. Click **CREATE**
7. A JSON file will download automatically - **KEEP THIS SAFE!**

---

## Step 2: Share Your Google Sheet with Service Account

### 2.1 Get Service Account Email
1. Open the JSON file you downloaded (in any text editor)
2. Find the line `"client_email": "gone-girl-form@..."` 
3. Copy the entire email address

### 2.2 Share the Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Nxt6W0xtnI1-zHBQZYabi_T_FqIqTeR1niSbekhOFfo/
2. Click **SHARE** (top right)
3. Paste the service account email
4. Give it **Editor** access
5. Uncheck "Notify people"
6. Click **SHARE**

---

## Step 3: Update Environment Variables

### 3.1 Get Credentials as JSON String
1. Open the JSON file you downloaded
2. Copy the **entire contents** (from `{` to `}`)

### 3.2 Create/Update `.env` File
In `/Users/shivanidalakoti/Desktop/workspace/gogonegirl/.env`, add:

```env
# Gmail Configuration
GMAIL_USER=gogonegirl@gmail.com
GMAIL_PASSWORD=your_16_char_app_password

# Google Sheets Configuration
SHEET_ID=1Nxt6W0xtnI1-zHBQZYabi_T_FqIqTeR1niSbekhOFfo
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"gone-girl-...",...entire json content...}

# Server
PORT=5000
```

**⚠️ IMPORTANT:** 
- Replace the entire `GOOGLE_CREDENTIALS` value with your JSON key (keep it all on one line)
- Make sure to include the full JSON from `{` to `}`

---

## Step 4: Install Dependencies & Start Server

```bash
# Install new packages
npm install

# Start the server
npm start
```

You should see:
```
🚀 Gone Girl Server Running!
📍 Server: http://localhost:5000
📧 Email: gogonegirl@gmail.com → shivaniinavihs96@gmail.com
```

---

## Step 5: Test the Integration

1. Open http://localhost:5000 in your browser
2. Fill out the contact form with test data
3. Click "Send My Message"
4. You should see: ✓ Message sent! We'll be in touch soon.
5. Check your Google Sheet - new row should appear!
6. Check email - you should receive the submission

---

## Google Sheet Columns

The form data will be added to your sheet with these columns:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Destination | Message |

---

## Troubleshooting

### Error: "Failed to send message"
→ Make sure:
1. Backend server is running (`npm start`)
2. `.env` file exists with correct credentials
3. You shared the Google Sheet with the service account email

### Error: "Invalid credentials"
→ Check:
1. GOOGLE_CREDENTIALS JSON is complete and valid
2. Service account email is correct
3. Sheet is shared with service account

### Data not appearing in Sheet
→ Verify:
1. Sheet ID is correct (from URL)
2. Service account has Editor access
3. Browser console shows no errors (F12)

### Email not sending
→ Check:
1. Gmail App Password is correct (16 characters with spaces)
2. 2-Factor Authentication is enabled on Google Account
3. GMAIL_USER and GMAIL_PASSWORD are in `.env`

---

## How It Works

When someone submits the form:

1. ✅ Form data sent to backend server
2. ✅ Data added to your Google Sheet (new row)
3. ✅ Excel file created with submission details
4. ✅ Email sent to shivaniinavihs96@gmail.com with Excel attachment
5. ✅ User sees success message

---

## Security Notes

🔒 **Never share your `.env` file or JSON credentials**
- Add `.env` to `.gitignore` (do not commit to git)
- Keep the JSON key file safe
- If compromised, delete the key and create a new one

---

**✅ Setup complete! Your form will now save to Google Sheets and email you simultaneously!** 🎉
