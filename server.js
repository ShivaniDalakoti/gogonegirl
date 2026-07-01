const express = require('express');
const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://gogonegirl.vercel.app',
  ],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Gmail Configuration
const gmailUser = process.env.GMAIL_USER || 'gogonegirl@gmail.com';
const gmailPassword = process.env.GMAIL_PASSWORD; // App password (not regular password)

// Google Sheets Configuration
const SHEET_ID = process.env.SHEET_ID || '1Nxt6W0xtnI1-zHBQZYabi_T_FqIqTeR1niSbekhOFfo';
const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : null;

let sheetsClient = null;
if (GOOGLE_CREDENTIALS) {
  sheetsClient = google.sheets({
    version: 'v4',
    auth: new google.auth.GoogleAuth({
      credentials: GOOGLE_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    }),
  });
}

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPassword,
  },
});

// Helper function to create Excel file
async function createExcelFile(formData) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Form Submission');

  // Style header
  const headerStyle = {
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF8B4513' } },
    font: { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 },
    alignment: { horizontal: 'center', vertical: 'center' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    },
  };

  // Style data cells
  const dataStyle = {
    alignment: { horizontal: 'left', vertical: 'top', wrapText: true },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    },
  };

  // Add headers
  const headers = ['Field', 'Value'];
  worksheet.columns = [
    { header: headers[0], key: 'field', width: 20 },
    { header: headers[1], key: 'value', width: 50 },
  ];

  // Style header row
  worksheet.getRow(1).eachCell((cell) => {
    cell.style = headerStyle;
  });

  // Add form data
  const rows = [
    ['Submission Date', new Date().toLocaleString()],
    ['First Name', formData.fname || 'N/A'],
    ['Last Name', formData.lname || 'N/A'],
    ['Email Address', formData.email || 'N/A'],
    ['Dream Destination', formData.destination || 'N/A'],
    ['Message', formData.message || 'N/A'],
  ];

  rows.forEach((row) => {
    const newRow = worksheet.addRow({ field: row[0], value: row[1] });
    newRow.eachCell((cell) => {
      cell.style = dataStyle;
    });
  });

  // Adjust row heights
  worksheet.getRow(1).height = 25;
  rows.forEach((_, index) => {
    worksheet.getRow(index + 2).height = 30;
  });

  // Save to buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

// Handle form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const { fname, lname, email, destination, message } = req.body;

    // Validate required fields
    if (!fname || !lname || !email) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, and email are required',
      });
    }

    // Add to Google Sheets
    if (sheetsClient) {
      try {
        await sheetsClient.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: 'Sheet1!A:F',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                new Date().toLocaleString(),
                fname,
                lname,
                email,
                destination || 'Not specified',
                message || '',
              ],
            ],
          },
        });
        console.log(`✅ Form data added to Google Sheet`);
      } catch (sheetError) {
        console.error('Google Sheets error:', sheetError.message);
        // Continue with email even if sheet fails
      }
    }

    // Create Excel file
    const excelBuffer = await createExcelFile({
      fname,
      lname,
      email,
      destination,
      message,
    });

    // Prepare email content
    const emailContent = `
      <h2>New Form Submission from Gone Girl Website</h2>
      <p><strong>Name:</strong> ${fname} ${lname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Dream Destination:</strong> ${destination || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message ? message.replace(/\n/g, '<br>') : 'N/A'}</p>
      <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
      <hr>
      <p>See attached Excel file for complete details.</p>
    `;

    // Send email
    const mailOptions = {
      from: gmailUser,
      to: 'shivaniinavihs96@gmail.com',
      subject: `New Gone Girl Form Submission - ${fname} ${lname}`,
      html: emailContent,
      attachments: [
        {
          filename: `gone-girl-submission-${Date.now()}.xlsx`,
          content: excelBuffer,
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send success response
    res.json({
      success: true,
      message: '✓ Message sent! We\'ll be in touch soon.',
    });

    console.log(`✅ Form submitted by ${fname} ${lname} (${email})`);
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
});

// Test email endpoint
app.get('/api/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: gmailUser,
      to: 'shivaniinavihs96@gmail.com',
      subject: 'Gone Girl - Email Configuration Test',
      html: '<h2>✅ Email Configuration Working!</h2><p>Your Gone Girl website email is properly configured.</p>',
    });

    res.json({
      success: true,
      message: 'Test email sent successfully to shivaniinavihs96@gmail.com',
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============= IN-MEMORY DATA STORAGE =============
// In production, use a database like MongoDB or PostgreSQL

const users = [
  {
    id: 1,
    fname: 'Shivani',
    lname: 'Dalakoti',
    email: 'shivani@gogonegirl.com',
    phone: '+91 9084627369',
    password: 'password123',
    role: 'admin'
  }
];

const trips = [
  {
    id: 1,
    title: 'Himalayan Escape',
    location: 'Nainital, India',
    price: 20000,
    duration: '4 Nights / 5 Days',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    groupSize: 12,
    rating: 4.9,
    reviews: 156,
    category: 'mountain',
    description: 'Experience the majestic Himalayas with curated itineraries.',
    highlights: ['Kainchi Dham', 'Nainital Lake', 'Waterfall Trek', 'Jim Corbett Safari'],
    included: ['Flights', 'Accommodation', 'Meals', 'Activities', '24/7 Support']
  },
  {
    id: 2,
    title: 'Kerala Backwaters',
    location: 'Kerala, India',
    price: 25000,
    duration: '5 Nights / 6 Days',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    groupSize: 12,
    rating: 4.8,
    reviews: 142,
    category: 'beach',
    description: 'Explore the serene backwaters of Kerala.',
    highlights: ['Tea Hills', 'Wildlife Sanctuary', 'Houseboat', 'Cochin Heritage'],
    included: ['Flights', 'Accommodation', 'Meals', 'Activities', '24/7 Support']
  },
  {
    id: 3,
    title: 'Jim Corbett Wilderness',
    location: 'Uttarakhand, India',
    price: 10000,
    duration: '2 Nights / 3 Days',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop',
    groupSize: 10,
    rating: 4.7,
    reviews: 98,
    category: 'wildlife',
    description: 'Adventure in the heart of nature.',
    highlights: ['Jungle Safari', 'River Walks', 'Bonfire', 'Nature Walks'],
    included: ['Transport', 'Accommodation', 'Meals', 'Safari', '24/7 Support']
  }
];

const bookings = [];
let bookingId = 1;

// ============= API ROUTES =============

// ===== AUTHENTICATION ROUTES =====

// Register
app.post('/api/auth/register', (req, res) => {
  try {
    const { fname, lname, email, phone, password } = req.body;

    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      fname,
      lname,
      email,
      phone,
      password, // In production, hash this!
      role: 'user'
    };

    users.push(newUser);

    res.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id,
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role
      },
      token: `token_${newUser.id}_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token: `token_${user.id}_${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== TRIPS ROUTES =====

// Get all trips
app.get('/api/trips', (req, res) => {
  try {
    res.json({
      success: true,
      trips: trips
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single trip
app.get('/api/trips/:id', (req, res) => {
  try {
    const trip = trips.find(t => t.id === parseInt(req.params.id));

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    res.json({
      success: true,
      trip: trip
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== BOOKINGS ROUTES =====

// Create booking
app.post('/api/bookings', (req, res) => {
  try {
    const { tripId, travelers, departureDate, specialRequests, totalAmount } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const trip = trips.find(t => t.id === parseInt(tripId));
    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found'
      });
    }

    const booking = {
      id: bookingId++,
      tripId: parseInt(tripId),
      tripTitle: trip.title,
      location: trip.location,
      startDate: departureDate,
      endDate: new Date(new Date(departureDate).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      travelers,
      price: totalAmount,
      specialRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);

    res.json({
      success: true,
      message: 'Booking confirmed!',
      booking: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get user bookings
app.get('/api/bookings', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    // In production, extract user ID from token
    // For now, return all bookings
    res.json({
      success: true,
      bookings: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== ADMIN ROUTES =====

// Get admin stats
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = {
      totalUsers: users.length,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, b) => sum + b.price, 0),
      activeTrips: trips.length
    };

    res.json({
      success: true,
      stats: stats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all trips (admin)
app.get('/api/admin/trips', (req, res) => {
  try {
    const tripsWithStats = trips.map(trip => ({
      ...trip,
      bookings: bookings.filter(b => b.tripId === trip.id).length,
      revenue: bookings.filter(b => b.tripId === trip.id).reduce((sum, b) => sum + b.price, 0)
    }));

    res.json({
      success: true,
      trips: tripsWithStats
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============= STATIC & LEGACY ROUTES =============

// Serve index.html for the old website
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Gone Girl Server Running!`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`📧 Email: ${gmailUser} → shivaniinavihs96@gmail.com`);
  console.log(`\n📚 API Endpoints:`);
  console.log(`   POST   /api/auth/register       - Create account`);
  console.log(`   POST   /api/auth/login          - Login`);
  console.log(`   GET    /api/trips               - Get all trips`);
  console.log(`   GET    /api/trips/:id           - Get trip details`);
  console.log(`   POST   /api/bookings            - Create booking`);
  console.log(`   GET    /api/bookings            - Get user bookings`);
  console.log(`   GET    /api/admin/stats         - Get admin stats`);
  console.log(`   GET    /api/admin/trips         - Get all trips (admin)`);
  console.log(`   GET    /api/test-email          - Test email config\n`);
});
