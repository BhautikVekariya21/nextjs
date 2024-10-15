import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    // Log SMTP settings
    console.log({
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_USER: process.env.EMAIL_USER,
      DOMAIN: process.env.DOMAIN,
    });

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");

    // Find user in the database
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Set verification or reset token and expiry based on the emailType
    if (emailType === "VERIFY") {
      user.verifyToken = token;
      user.verifyTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    } else if (emailType === "RESET") {
      user.forgotPasswordToken = token;
      user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    }

    await user.save();

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set the email subject and URL based on emailType
    let subject, emailBody;
    if (emailType === "VERIFY") {
      subject = "Verify your email";
      emailBody = `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #4a90e2; font-size: 24px; font-weight: bold;">Email Verification</h2>
          <p style="font-size: 16px; color: #374151; text-align: center;">
            Thank you for joining us! To complete your sign-up, please click the button below to verify your email:
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.DOMAIN}/verifyemail?token=${token}" style="background-color: #4a90e2; color: white; padding: 10px 20px; font-size: 16px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          </div>
          <p style="font-size: 16px; color: #374151; margin-top: 20px;">
            If the button doesn’t work, copy and paste the link below into your browser:
          </p>
          <p style="word-wrap: break-word; background-color: #f3f4f6; padding: 10px; border-radius: 5px; border: 1px solid #e5e7eb;">
            ${process.env.DOMAIN}/verifyemail?token=${token}
          </p>
          <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 20px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `;
    } else if (emailType === "RESET") {
      subject = "Reset your password";
      emailBody = `
        <div style="font-family: Arial, sans-serif; background-color: #f9fafb; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #ef4444; font-size: 24px; font-weight: bold;">Password Reset Request</h2>
          <p style="font-size: 16px; color: #374151; text-align: center;">
            We received a request to reset your password. If you made this request, click the button below to reset your password:
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.DOMAIN}/resetpassword?token=${token}" style="background-color: #ef4444; color: white; padding: 10px 20px; font-size: 16px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>
          <p style="font-size: 16px; color: #374151; margin-top: 20px;">
            If the button doesn’t work, copy and paste the link below into your browser:
          </p>
          <p style="word-wrap: break-word; background-color: #f3f4f6; padding: 10px; border-radius: 5px; border: 1px solid #e5e7eb;">
            ${process.env.DOMAIN}/resetpassword?token=${token}
          </p>
          <p style="font-size: 14px; color: #6b7280; text-align: center; margin-top: 20px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `;
    }

     // Send email
     await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: emailBody,
      });
  
      console.log(`Email sent to ${email} for ${emailType}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Email could not be sent");
    }
  };