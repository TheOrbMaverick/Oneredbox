
import emailjs from '@emailjs/nodejs';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_BOOKING_MAIL_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

type BookingData = Record<string, any>;

export async function sendBookingEmail(serviceName: string, data: BookingData) {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.error("EmailJS configuration missing");
    return;
  }

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY, 
    });

  const {fullName, email, phone, ...rest} = data;
  
  const dataToSave = {fullName, email, phone};
  const messageDetails = Object.entries(dataToSave)
    .map(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      
      const formattedValue = Array.isArray(value) ? value.join(", ") : value;
      
      return `${formattedKey}: ${formattedValue}`;
    })
    .join("\n");

  const templateParams = {
      name: dataToSave.fullName,
      email: dataToSave.email,
      message: `New Booking Request for ${serviceName}\n\nDetails:\n${messageDetails}`,
      subject: `New Booking: ${serviceName} - ${dataToSave.fullName}`,
  };

  try {
    const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        {
            publicKey: EMAILJS_PUBLIC_KEY,
            privateKey: EMAILJS_PRIVATE_KEY, 
        }
    );

    
  } catch (error) {
    console.error("Error sending booking email:", error);
    throw error;
  }
}
