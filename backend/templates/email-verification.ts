export const emailVerificationTemplate = (name: string, code: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <h2 style="color: #333;">Hello, ${name}</h2>
    <p>Thank you for signing up to <strong>ParkingPro</strong>.</p>
    <p>Please use the verification code below to activate your account:</p>
    <h3 style="color: #1a73e8;">${code}</h3>
    <p>This code will expire in 15 minutes.</p>
    <br />
    <p style="font-size: 0.9em; color: #555;">If you didn't request this, please ignore this email.</p>
    <p style="color: #999;">– ParkingPro Team</p>
  </div>
</body>
</html>
`;
