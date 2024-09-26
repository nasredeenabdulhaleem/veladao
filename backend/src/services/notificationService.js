// backend/src/services/notificationService.js

const nodemailer = require("nodemailer"); // For email notifications

class NotificationService {
  constructor() {
    // Initialize nodemailer transporter for email notifications
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });
  }

  async sendNotification(user, message) {
    try {
      // Define email options
      const mailOptions = {
        from: "your-email@gmail.com",
        to: user.email,
        subject: "Notification",
        text: message,
      };

      // Send email
      await this.transporter.sendMail(mailOptions);
      console.log(`Notification sent to ${user.email}`);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
}

module.exports = NotificationService;
