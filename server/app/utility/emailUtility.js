import nodemailer from "nodemailer";

const SendEmail = async (EmailTo, EmailText, EmailSubject) => {
  try {
    // ✅ transporter তৈরি (no backslash!)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ mail options
    const mailOptions = {
      from: `"Boni Amin Support" <${process.env.EMAIL_USER}>`,
      to: EmailTo,
      subject: EmailSubject,
      text: EmailText,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
          <div style="max-width:600px;margin:auto;background:white;padding:20px;border-radius:10px;">
            <h2 style="color:#2563eb;text-align:center;">Email Verify code</h2>
            <p style="font-size:16px;color:#333;">${EmailText}</p>
            <p style="margin-top:30px;font-size:14px;color:#666;">Best regards,<br><b>Md Boni Amin(Computer engineer)</b></p>
          </div>
        </div>
      `,
    };

    // ✅ ইমেইল পাঠানো
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true, message: "Email sent successfully" };

  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    return { success: false, message: error.message };
  }
};

export default SendEmail;
