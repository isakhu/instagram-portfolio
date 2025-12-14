const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Contact form rate limiting (more strict)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your frontend)
app.use(express.static('public'));

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'yishakhak@gmail.com',
    pass: process.env.EMAIL_PASS // App password for Gmail
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Yishak Photography Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    // Validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 50 characters'
      });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be between 10 and 1000 characters'
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: validator.escape(name.trim()),
      email: validator.normalizeEmail(email),
      service: validator.escape(service.trim()),
      message: validator.escape(message.trim())
    };

    // Email to you (photographer)
    const photographerEmail = {
      from: process.env.EMAIL_USER,
      to: 'yishakhak@gmail.com',
      subject: `New Photography Inquiry - ${sanitizedData.service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Photography Inquiry
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Client Details</h3>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Service:</strong> ${sanitizedData.service}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6;">${sanitizedData.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; color: #1976d2;">
              <strong>Reply to:</strong> ${sanitizedData.email}
            </p>
          </div>
        </div>
      `
    };

    // Auto-reply email to client
    const clientEmail = {
      from: process.env.EMAIL_USER,
      to: sanitizedData.email,
      subject: 'Thank you for your photography inquiry - Yishak Tule Photography',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Yishak Tule Photography</h1>
            <p style="margin: 10px 0 0 0;">Professional Photography Services</p>
          </div>
          
          <div style="padding: 30px; background: #fff; border: 1px solid #e9ecef; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333;">Hello ${sanitizedData.name}!</h2>
            
            <p>Thank you for your interest in my photography services. I have received your inquiry for <strong>${sanitizedData.service}</strong> and will get back to you within 24 hours.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">Your Inquiry Summary</h3>
              <p><strong>Service:</strong> ${sanitizedData.service}</p>
              <p><strong>Message:</strong> ${sanitizedData.message}</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my portfolio on Instagram: @_yzu_</li>
              <li>Call me directly: 0994781422</li>
              <li>Visit my website for more examples of my work</li>
            </ul>
            
            <p>I look forward to capturing your special moments!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0;"><strong>Yishak Tule</strong></p>
              <p style="margin: 5px 0; color: #666;">Professional Photographer</p>
              <p style="margin: 5px 0; color: #666;">📧 yishakhak@gmail.com</p>
              <p style="margin: 5px 0; color: #666;">📱 0994781422</p>
              <p style="margin: 5px 0; color: #666;">📍 Addis Ababa, Ethiopia</p>
            </div>
          </div>
        </div>
      `
    };

    // Send emails
    await transporter.sendMail(photographerEmail);
    await transporter.sendMail(clientEmail);

    // Log the inquiry (you can save to database here)
    console.log(`New inquiry from ${sanitizedData.name} (${sanitizedData.email}) for ${sanitizedData.service}`);

    res.json({
      success: true,
      message: 'Thank you for your message! I will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact me directly.'
    });
  }
});

// Get portfolio items (you can expand this with a database)
app.get('/api/portfolio', (req, res) => {
  const portfolioItems = [
    {
      id: 1,
      title: 'Wedding Photography',
      category: 'wedding',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
      description: 'Beautiful wedding moments captured with artistic excellence'
    },
    {
      id: 2,
      title: 'Portrait Session',
      category: 'portrait',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
      description: 'Professional portrait photography for individuals and families'
    },
    {
      id: 3,
      title: 'Corporate Event',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=400&fit=crop',
      description: 'Professional corporate event and conference photography'
    },
    {
      id: 4,
      title: 'Nature Landscape',
      category: 'nature',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=400&fit=crop',
      description: 'Breathtaking landscape and nature photography'
    },
    {
      id: 5,
      title: 'Fashion Shoot',
      category: 'fashion',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=400&fit=crop',
      description: 'Creative fashion and lifestyle photography'
    },
    {
      id: 6,
      title: 'Street Photography',
      category: 'street',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      description: 'Candid street photography capturing life moments'
    }
  ];

  res.json({
    success: true,
    data: portfolioItems
  });
});

// Get services and pricing
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      name: 'Portrait Photography',
      price: 2500,
      currency: 'ETB',
      description: 'Professional headshots and personal portraits',
      duration: '1-2 hours',
      includes: ['High-resolution images', 'Basic editing', '10-15 final photos']
    },
    {
      id: 2,
      name: 'Wedding Photography',
      price: 15000,
      currency: 'ETB',
      description: 'Complete wedding coverage from ceremony to reception',
      duration: 'Full day',
      includes: ['Ceremony & reception coverage', 'Professional editing', '100+ final photos', 'Online gallery']
    },
    {
      id: 3,
      name: 'Corporate Events',
      price: 5000,
      currency: 'ETB',
      description: 'Professional event photography for businesses',
      duration: '2-4 hours',
      includes: ['Event coverage', 'Professional editing', '50+ final photos', 'Same-day preview']
    },
    {
      id: 4,
      name: 'Nature & Landscape',
      price: 3500,
      currency: 'ETB',
      description: 'Artistic landscape and nature photography',
      duration: '2-3 hours',
      includes: ['Location scouting', 'Artistic editing', '20+ final photos', 'Print-ready files']
    }
  ];

  res.json({
    success: true,
    data: services
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Yishak Photography Backend running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.EMAIL_USER || 'yishakhak@gmail.com'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});