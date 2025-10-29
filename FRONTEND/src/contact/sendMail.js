// src/contact/sendMail.js (Simplified Version)
import nodemailer from "nodemailer";

export const sendMail = async (name, email, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tedxpccoer@gmail.com",
      pass: "zcii tzki efwx lhto",
    },
  });

  const ticketId = `TEDX-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium', 
    timeStyle: 'medium' 
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
      <div style="background: linear-gradient(135deg, #e62b1e 0%, #c32014 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0;">TED<strong>x</strong>PCCOER</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Support Query Ticket</p>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px;">
        <div style="background: #fef2f2; border-left: 4px solid #e62b1e; padding: 15px; margin-bottom: 20px;">
          <strong>Ticket ID:</strong> ${ticketId}<br>
          <strong>Submitted:</strong> ${timestamp} IST
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; background: #f8fafc;"><strong>Name:</strong></td><td style="padding: 8px;">${name}</td></tr>
          <tr><td style="padding: 8px; background: #f8fafc;"><strong>Email:</strong></td><td style="padding: 8px;">${email}</td></tr>
          <tr><td style="padding: 8px; background: #f8fafc;"><strong>Subject:</strong></td><td style="padding: 8px;">${subject}</td></tr>
        </table>
        
        <div style="margin-top: 20px;">
          <strong style="color: #e62b1e;">Message:</strong>
          <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="mailto:${email}" style="background: #e62b1e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reply to ${name}
          </a>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: "TEDxPCCOER Contact Form" `<tedxpccoer@gmail.com>`,
    to: "tedxpccoer@gmail.com",
    replyTo: email,
    subject: `📩 Support Query: ${subject}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    return { success: true, ticketId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error: error.message };
  }
};