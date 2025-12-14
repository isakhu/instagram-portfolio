# 🚀 Yishak Photography Website - Complete Setup Guide

## 📋 What You Have
- ✅ Professional Instagram-style portfolio website
- ✅ Node.js backend with email functionality
- ✅ Contact form that sends emails
- ✅ Ethiopian pricing in Birr
- ✅ Your actual contact information
- ✅ Professional testimonials with Ethiopian names

## 🛠️ Setup Instructions

### Step 1: Install Node.js
1. Go to https://nodejs.org
2. Download and install the latest LTS version
3. Verify installation: Open terminal/command prompt and type:
   ```
   node --version
   npm --version
   ```

### Step 2: Install Dependencies
1. Open terminal in your project folder
2. Run this command:
   ```
   npm install
   ```

### Step 3: Email Configuration
1. Copy `.env.example` to `.env`
2. Get Gmail App Password:
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an "App Password" for this website
   - Copy the 16-character password
3. Edit `.env` file:
   ```
   EMAIL_USER=yishakhak@gmail.com
   EMAIL_PASS=your_16_character_app_password_here
   PORT=3000
   ```

### Step 4: Add Your Profile Picture
1. Put your profile photo in the `images/` folder
2. Name it exactly: `profile.jpg.jpeg`

### Step 5: Start the Website
1. Run the backend server:
   ```
   npm start
   ```
2. Open your browser and go to: `http://localhost:3000`

## 📧 Email Features
- ✅ Contact form sends emails to: yishakhak@gmail.com
- ✅ Auto-reply sent to clients
- ✅ Professional email templates
- ✅ Spam protection and rate limiting

## 💰 Current Pricing (in Ethiopian Birr)
- Portrait Photography: 2,500 ETB
- Wedding Photography: 15,000 ETB
- Corporate Events: 5,000 ETB
- Nature & Landscape: 3,500 ETB

## 📱 Contact Information
- Email: yishakhak@gmail.com
- Phone: 0994781422
- Location: Addis Ababa, Ethiopia
- Instagram: @_yzu_

## 🎨 Website Features
- Instagram-style profile layout
- Dark/light theme toggle
- Professional services section
- Client testimonials (Ethiopian names)
- Contact form with backend
- Responsive mobile design
- Professional animations
- Story highlights
- Verification badge

## 🔧 Customization
- Edit `script.js` to change portfolio projects
- Edit `styles.css` to change colors/design
- Edit `server.js` to modify email templates
- Edit `index.html` to change content

## 🚨 Troubleshooting
1. **Email not working?** 
   - Check your Gmail App Password
   - Make sure 2FA is enabled on Gmail
   
2. **Website not loading?**
   - Make sure you ran `npm install`
   - Check if port 3000 is available
   
3. **Images not showing?**
   - Make sure your profile picture is named correctly
   - Check the `images/` folder exists

## 🌐 Going Live (Optional)
To put your website online:
1. Sign up for Heroku, Vercel, or Netlify
2. Connect your project
3. Add environment variables
4. Deploy!

## 📞 Need Help?
Contact Yishak at yishakhak@gmail.com or 0994781422

---
**Your professional photography website is ready! 🎉**