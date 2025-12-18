# EmailJS Setup Guide

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

### Template Name: `contact_form`

### Subject:
```
New Contact Form Submission from {{from_name}}
```

### Body:
```
New contact form submission received:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Timeline: {{timeline}}
Message: {{message}}

---
Reply to: {{reply_to}}
Sent via Shravo Website Contact Form
```

4. Save the template
5. Note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcdefghijklmnop`)
3. Copy it

## Step 5: Update Configuration

Open `/src/services/emailService.js` and replace:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
```

Example:
```javascript
const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop';
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
```

## Step 6: Test

1. Save the file
2. Run `npm run build`
3. Upload to Hostinger
4. Test the contact form
5. Check hello@shravo.com for the email

## Email Template Variables

The following variables are sent from the contact form:

- `{{from_name}}` - User's name
- `{{from_email}}` - User's email
- `{{company}}` - User's company
- `{{timeline}}` - Deployment timeline
- `{{message}}` - User's message
- `{{to_email}}` - Your email (hello@shravo.com)
- `{{reply_to}}` - User's email for replies

## Free Tier Limits

- 200 emails/month
- Upgrade to paid plan if you need more

## Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify all credentials are correct
3. Make sure email service is connected in EmailJS dashboard
4. Check spam folder

### Getting CORS errors?
- EmailJS handles CORS automatically, no configuration needed

### Want to test locally?
- It works the same on localhost and production
- Just make sure you've added your credentials

## Security Note

Your EmailJS Public Key is safe to expose in frontend code. It's designed to be public.
