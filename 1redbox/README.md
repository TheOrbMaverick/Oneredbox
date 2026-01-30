# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

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
