const isGmail = (email) => {
    return email.endsWith('@gmail.com');
}

const isValidGmail = (email) => {
    const gmailRegex = /^[^\s@]+@[^\s@]+\.gmail\.com$/;
    return gmailRegex.test(email);
}

const generateOTP = (digits) => {
    let otp = "";
    const characters = "0123456789";

    for (let i = 0; i < digits; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        otp += characters.charAt(randomIndex);
    }

    return otp;
}

module.exports = {
    isGmail,
    generateOTP
}