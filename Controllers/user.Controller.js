const userModel = require('../Models/userModel.js');
const nodemailer = require("nodemailer");

exports.userRegister = async (req, res) => {
  try {
    const { fullName, legalIssue, email, phoneNumber, message } = req.body;

    const newUserModel = new userModel({
      fullName,
      legalIssue,
      email,
      phoneNumber,
      message
    });

    await newUserModel.save();

    const transporter = nodemailer.createTransport({
        name: "hostgator",
        host: "gator3008.hostgator.com",
        port: 587,
        // secure: true,
        auth: {
          user: "noreply-syndeo@clouddatanetworks.com",
          pass: "CDN@syndeo",
        },
      });
  
      var mailOptions = {
        from: "noreply-syndeo@clouddatanetworks.com",
        to: email,
        subject: `Thank for you Contacting us`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .container {
      max-width: 600px;
      width: 100%;
      background-color: #F1F5F9;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      font-size: 24px;
      color: #AE275F;
      margin-bottom: 20px;
    }

    .content p.confirmation {
      font-size: 20px;
      color: #AE275F;
      margin: 20px 0;
      font-weight: bold;
    }

    .details {
      margin: 20px 0;
      display: flex;
      flex-direction: column;  /* Ensures vertical stacking */
      align-items: center;
      gap: 15px;
      width: 100%;
    }

    .details .field {
      width: 80%; /* Adjust width for better alignment */
      background-color: #f5f5f5;
      padding: 10px 15px;
      border: 1px solid #dddddd;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
    }

    .footer p {
      font-size: 14px;
      color: #AE275F;
      margin-top: 20px;
    }

    .btn-cancel-reschedule {
      background-color: #28a745;
      color: white;
      font-weight: bold;
      padding: 8px 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      text-decoration: none; /* Ensure the link inside the button doesn't affect styling */
      margin-left: 15px;
      margin-right: 5px;
      width: 80%; /* Ensure the button has the same width as the fields */
      display: inline-block;
      text-align: center;
    }

    .btn-cancel-reschedule:hover {
      opacity: 0.9;
    }
  </style>
</head>
<body>

<div class="container">
  <!-- Header -->
  <div class="header">
    <h1>MANNAM AND ASSOCIATES</h1>
  </div>

  <!-- Booking Confirmation -->
  <div class="content">
    <p class="confirmation">Thank you for registering us</p>
  </div>

  <!-- Booking Details -->
  <div class="details">
        <div> Hlo ${fullName}, Shortly our team will connect with you!!. </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <p>- Team Syndèo</p>
  </div>
</div>

</body>
</html>`,
                    };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json({ status: false, message: "Error in sending mail" });
        } else {
          console.log("This is for the testing purposes");
          return res.status(201).json(newUser);
        }
      });

      

    res.status(201).json({
      message: 'Legal issue created successfully',
      data: newUserModel
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating legal issue', error });
  }
};
