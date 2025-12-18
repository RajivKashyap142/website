# Hostinger Deployment Guide

## ✅ PHP Email Solution (Uses Your Existing Hosting)

No third-party services needed! Your Hostinger account already has everything.

---

## Step 1: Build Your Site

```bash
npm run build
```

This creates the `dist` folder with all your files.

---

## Step 2: Upload to Hostinger

### Files to Upload to `public_html`:

1. **From `dist` folder:**
   - `index.html`
   - `assets/` folder (all CSS and JS files)
   - `Shravo-logo.png`

2. **From `public` folder:**
   - `send-email.php` ← **Important!**

### File Structure on Hostinger:

```
public_html/
├── index.html
├── send-email.php          ← PHP email handler
├── Shravo-logo.png
└── assets/
    ├── index-xxxxx.js
    └── index-xxxxx.css
```

---

## Step 3: Test the Form

1. Go to your website: https://www.shravo.com
2. Scroll to contact form
3. Fill out all fields
4. Click "Schedule Strategy Call"
5. Check hello@shravo.com for the email

---

## What Happens:

1. User fills form
2. Clicks submit
3. JavaScript sends data to `/send-email.php`
4. PHP script sends email to `hello@shravo.com`
5. User sees success message
6. You receive email instantly

---

## Email You'll Receive:

```
From: noreply@shravo.com
To: hello@shravo.com
Subject: New Contact Form Submission from John Doe

New contact form submission received:

Name: John Doe
Email: john@company.com
Company: Acme Corp
Deployment Timeline: 3 months
Message: We're interested in voice automation...

---
Sent from Shravo Contact Form
IP Address: 123.456.789.0
Timestamp: 2025-12-18 08:10:00
```

---

## Features:

✅ **No third-party services**  
✅ **Uses your existing Hostinger**  
✅ **Free (included in hosting)**  
✅ **Unlimited submissions**  
✅ **Instant email delivery**  
✅ **Spam protection** (basic validation)  
✅ **User-friendly UX**  
✅ **Loading states**  
✅ **Error handling**  

---

## Troubleshooting:

### Emails not arriving?

1. **Check spam folder**
2. **Verify PHP mail is enabled:**
   - Login to Hostinger hPanel
   - Go to Advanced → PHP Configuration
   - Ensure `mail()` function is enabled

3. **Check PHP error log:**
   - In hPanel → Files → File Manager
   - Look for `error_log` file
   - Check for PHP errors

### Getting 404 on form submit?

- Make sure `send-email.php` is in the root `public_html` folder
- Check file permissions (should be 644)

### Form not submitting?

- Open browser console (F12)
- Check for JavaScript errors
- Verify network tab shows POST to `/send-email.php`

---

## Security Notes:

The PHP script includes:
- ✅ Input sanitization
- ✅ Email validation
- ✅ XSS protection
- ✅ CORS headers
- ✅ Method validation (POST only)

---

## Optional: Add reCAPTCHA

To prevent spam, you can add Google reCAPTCHA:

1. Get reCAPTCHA keys from Google
2. Add to form
3. Validate in PHP

Let me know if you want me to add this!

---

## Cost:

**$0** - Already included in your Hostinger plan!

---

## That's It!

No accounts, no subscriptions, no third parties.  
Just your existing Hostinger hosting doing what it does best.
