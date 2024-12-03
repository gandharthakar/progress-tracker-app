const emailVerificationWithOTP = (otp, link) => {
    return `
    
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP - Verify | Progress Tracker App.</title>
    <style>
        * {
            margin: 0px;
            padding: 0px;
            border: 0px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    </style>
</head>

<body style="padding:0; background: #f4f4f5;">
    <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"
        style="max-width: 580px; width:100%; border: 0px; margin: 0px auto;">
        <tr>
            <td style="padding: 20px;">
                <table cellpadding="0" cellspacing="0" align="center" width="100%" style="width:580px; border: 0px;">
                    <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                style="min-width:580px; border: 0px; background: #fff; max-width: 580px;" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="center"
                                            style="padding:20px 20px; text-align: center; background-color: #09090b;"
                                            valign="bottom">
                                            <img src="https://lh3.googleusercontent.com/u/0/d/1MvuFBYthelQwG4bqyRET5UQYpsR5euYH=w1920-h912-iv1"
                                                alt="logo" width="130px"
                                                style="display: inline-block; width: 130px; height: auto;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:20px 20px 5px 20px;">
                                            <p style="color: #09090b; font-weight: 600; font-size: 14px;">
                                                Dear User,
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0px 20px 10px 20px;">
                                            <p style="color: #27272a; font-weight: 400; font-size: 14px;">
                                                Below is you OTP & verify link. Link is valid only for 5 minutes.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:20px 20px;">
                                            <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                style="border: 0px; width: 100%;">
                                                <tr>
                                                    <td
                                                        style="padding: 10px 20px; text-align: center; border: 1px solid #09090b; background-color: #f4f4f5;">
                                                        <h2
                                                            style="display: inline-block; color: #27272a; font-size: 20px; font-weight: 700;">
                                                            ${otp}
                                                        </h2>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:0px 20px 20px 20px; text-align: center;">
                                            <p
                                                style="display: inline-block; color: #27272a; font-weight: 400; font-size: 14px;">
                                                Click on <b>"Verify"</b> to verify your account.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0px 20px 20px 20px; text-align: center;">
                                            <a href="${link}" title="Verify" target="_blank"
                                                style="display: inline-block; padding: 8px 20px; background-color: #09090b; color: #fafafa; text-decoration: none; min-width: 70px; text-align: center;">
                                                Verify
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0px 20px 20px 20px; text-align: center;">
                                            <p
                                                style="display: inline-block; color: #a1a1aa; font-weight: 400; font-size: 12px;">
                                                &copy; 2024 All Rights Reserved.
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
    
    `;
};

module.exports = emailVerificationWithOTP;