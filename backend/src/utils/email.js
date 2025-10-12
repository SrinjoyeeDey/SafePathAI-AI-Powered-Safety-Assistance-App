import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendPasswordResetEmail = async (
  email: string, 
  resetToken: string, 
  userName: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: `"SafePathAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Reset Request - SafePathAI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50;">SafePathAI</h1>
            <h2 style="color: #34495e;">Password Reset Request</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 15px;">
              Hello <strong>${userName}</strong>,
            </p>
            <p style="font-size: 14px; color: #34495e; line-height: 1.6;">
              We received a request to reset your password for your SafePathAI account. 
              If you didn't make this request, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3498db; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold;
                      display: inline-block;">
              Reset Your Password
            </a>
          </div>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="font-size: 12px; color: #856404; margin: 0;">
              <strong>Security Note:</strong> This link will expire in 1 hour for your security. 
              If the button doesn't work, copy and paste this link into your browser:
            </p>
            <p style="font-size: 12px; color: #856404; word-break: break-all; margin: 5px 0 0 0;">
              ${resetUrl}
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 12px; color: #7f8c8d; text-align: center; margin: 0;">
              © 2024 SafePathAI. All rights reserved.<br>
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    return false;
  }
};

export const sendPasswordChangeConfirmation = async (
  email: string, 
  userName: string
): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"SafePathAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Password Changed Successfully - SafePathAI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50;">SafePathAI</h1>
            <h2 style="color: #27ae60;">Password Changed Successfully</h2>
          </div>
          
          <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="font-size: 16px; color: #155724; margin-bottom: 15px;">
              Hello <strong>${userName}</strong>,
            </p>
            <p style="font-size: 14px; color: #155724; line-height: 1.6;">
              Your password has been successfully changed. If you made this change, no further action is required.
            </p>
          </div>
          
          <div style="background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="font-size: 12px; color: #721c24; margin: 0;">
              <strong>Security Alert:</strong> If you did not make this change, please contact our support team immediately 
              and consider changing your password again.
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="font-size: 12px; color: #7f8c8d; text-align: center; margin: 0;">
              © 2024 SafePathAI. All rights reserved.<br>
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    return false;
  }
};

export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (err) {
    return false;
  }
};