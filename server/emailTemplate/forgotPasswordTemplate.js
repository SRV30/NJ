const forgotPasswordTemplate = ({ name, otp }) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Password Reset Request</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background: linear-gradient(to bottom right, #fef3c7, #fff7ed, #fef3c7);
              color: #78350f;
            }

            .container {
              width: 100%;
              max-width: 600px;
              margin: 40px auto;
              padding: 40px;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
              text-align: center;
              position: relative;
              overflow: hidden;
            }

            .container::before {
              content: '';
              position: absolute;
              top: -80px;
              left: -80px;
              width: 160px;
              height: 160px;
              background: rgba(255, 204, 0, 0.2);
              border-radius: 50%;
              filter: blur(80px);
            }

            .header h1 {
              font-size: 28px;
              color: #b45309;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }

            .body {
              font-size: 16px;
              line-height: 1.6;
              color: #854d0e;
              text-align: center;
            }

            .body p {
              margin: 15px 0;
            }

            .otp-container {
              background: linear-gradient(to right, #facc15, #f59e0b);
              color: #fff;
              font-size: 28px;
              padding: 20px;
              text-align: center;
              font-weight: bold;
              border-radius: 10px;
              margin: 30px auto;
              display: inline-block;
              width: 80%;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            }

            .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #b45309;
            }

            .footer a {
              color: #c2410c;
              text-decoration: none;
              font-weight: bold;
            }

            .button-container {
              margin-top: 25px;
            }

            .button {
              background: linear-gradient(to right, #facc15, #f59e0b);
              color: white;
              padding: 12px 30px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
              text-transform: uppercase;
              transition: all 0.3s ease-in-out;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              display: inline-block;
            }

            .button:hover {
              background: linear-gradient(to right, #f59e0b, #facc15);
              transform: scale(1.05);
            }

          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>

            <div class="body">
              <p>Hello <strong>${name}</strong>,</p>
              <p>We received a request to reset the password for your <strong>Nandani Jewellers</strong> account.</p>
              <p>If you didn't request a password reset, please ignore this email.</p>
              <p>To reset your password, use the following OTP:</p>

              <div class="otp-container">
                ${otp}
              </div>

              <p>This OTP is valid for only <strong>10 minutes</strong>. Enter it on the Nandani Jewellers website to proceed.</p>
            </div>

            <div class="button-container">
              <a href="https://nandanijewellers.com/verify-otp" class="button">Reset Password</a>
            </div>

            <div class="footer">
              <p>Nandani Jewellers | <a href="https://www.nandanijewellers.com" target="_blank">www.nandanijewellers.com</a></p>
              <p>For assistance, contact <a href="mailto:support@nandanijewellers.com">support@nandanijewellers.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `;
};

export default forgotPasswordTemplate;
