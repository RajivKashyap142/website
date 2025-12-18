# Web3Forms Setup Guide (Super Simple!)

## Why Web3Forms?

✅ **Completely FREE** - No account needed  
✅ **No backend required** - Works on static hosting  
✅ **Instant setup** - Just get an access key  
✅ **Emails sent to YOUR email** - hello@shravo.com  
✅ **No limits** - Unlimited form submissions  
✅ **Spam protection** - Built-in captcha  

---

## Step 1: Get Your Free Access Key (30 seconds)

1. Go to https://web3forms.com
2. Enter your email: **hello@shravo.com**
3. Click "Get Access Key"
4. Check your email inbox
5. Copy the access key (looks like: `abcd1234-5678-90ef-ghij-klmnopqrstuv`)

That's it! No account creation, no login, no credit card.

---

## Step 2: Add Access Key to Your Code

Open `/src/components/sections/ContactSection.jsx` and replace:

```javascript
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
```

With your actual key:

```javascript
const WEB3FORMS_ACCESS_KEY = 'abcd1234-5678-90ef-ghij-klmnopqrstuv';
```

---

## Step 3: Build & Deploy

```bash
npm run build
```

Upload `dist` folder to Hostinger. Done!

---

## What Happens When Someone Submits?

1. User fills out contact form
2. Form data sent to Web3Forms API
3. **Email arrives at hello@shravo.com** with all details:
   - Name
   - Email
   - Company
   - Timeline
   - Message
4. User sees success message
5. Form resets

---

## Email Format You'll Receive

```
From: noreply@web3forms.com
To: hello@shravo.com
Subject: New Contact Form from [User Name]

Name: John Doe
Email: john@company.com
Company: Acme Corp
Timeline: 3
Message: We're interested in voice automation...

---
Sent via Shravo Contact Form
```

---

## Features Included

✅ **Spam Protection** - Honeypot and bot detection  
✅ **Email Validation** - Ensures valid email addresses  
✅ **Custom Subject** - "New Contact Form from [Name]"  
✅ **Auto-response** - Optional confirmation email to user  
✅ **File Uploads** - Support for attachments (if needed)  

---

## Want Auto-Response to Users?

Add this hidden field to send confirmation email to users:

```html
<input type="hidden" name="autoresponse" value="Thank you for contacting Shravo! We'll get back to you within 24 hours." />
```

---

## Troubleshooting

### Not receiving emails?
- Check spam folder
- Verify access key is correct
- Make sure hello@shravo.com is the email you used to get the key

### Getting errors?
- Check browser console
- Verify internet connection
- Make sure form fields have `name` attributes

### Want to test?
- Works on localhost too!
- Just submit the form and check your email

---

## Cost

**100% FREE**  
No hidden fees, no upgrades needed, no limits.

---

## Security

- Access key is safe to expose in frontend code
- Web3Forms handles all security
- GDPR compliant
- No data stored on their servers

---

## Alternative: Formspree

If you prefer Formspree instead:

1. Go to https://formspree.io
2. Sign up (free)
3. Create a form
4. Get form endpoint
5. Change form action to: `https://formspree.io/f/YOUR_FORM_ID`

But Web3Forms is simpler - no signup needed!
