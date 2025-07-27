const forgotPasswordTemplate = ({username, otp: otp, resetLink}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Hi ${username},</h2>
      
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Please use the OTP below to verify your identity and reset your password.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <p style="font-size: 24px; font-weight: bold; color: #007BFF; letter-spacing: 2px;">
          Your OTP: ${otp}
        </p>
      </div>
      
      <p style="font-size: 16px; color: #555;">
        You can also reset your password directly using the link below:
      </p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="${resetLink}" style="text-decoration: none;">
          <button style="background-color: #007BFF; color: white; padding: 12px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
            Reset Password
          </button>
        </a>
      </div>
      
      <p style="font-size: 14px; color: #777;">
        The OTP and reset link will expire in 15 minutes.
      </p>
      
      <hr style="margin: 30px 0;">
      <p style="font-size: 13px; color: #999;">
        If the button above doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetLink}" style="color: #007BFF;">reset password</a>
      </p>
      
      <p style="font-size: 13px; color: #aaa; text-align: center; margin-top: 40px;">
        &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  `;
};

export default forgotPasswordTemplate;
