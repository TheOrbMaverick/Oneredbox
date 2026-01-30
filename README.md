
### Requirements
- Environment variables
  - NEXT_PUBLIC_SANITY_PROJECT_ID=""
  - NEXT_PUBLIC_SANITY_DATASET=""
  - SANITY_STUDIO_SANITY_PROJECT_ID=""
  - SANITY_STUDIO_SANITY_DATASET=""
  - SANITY_API_TOKEN=""
  - NEXT_PUBLIC_RECAPTCHA_SITE_KEY=""
  - RECAPTCHA_SECRET_KEY=""

  - NEXT_PUBLIC_EMAILJS_SERVICE_ID=""
  - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=""
  - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=""
  - NEXT_PUBLIC_EMAILJS_BOOKING_MAIL_TEMPLATE_ID=""

  - EMAILJS_PRIVATE_KEY=""

- EmailJS
  - Two templates needed: 1 for the contact form and 1 to notify the admin of a new booking
  - In the Account Settings page, Security Tab, enable "Allow EmailJS for non-browser applications" and "Use Private Keys (recommended)"
  - Get the private and public key from the Account Settings page, General Tab, and set as environment variables
