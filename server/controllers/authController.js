import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

//Register Function here
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing Details" });
  }

  // here the try blog
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User Already Exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({ name, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    // sender welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to projects",
      text: `Welcome to my backend project. Your Account has been created with email id: ${email}`,
    };
    // console.log("Sending email to:", mailOptions);
    // const sendEmail = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", sendEmail);
    await transporter.sendMail(mailOptions);
    
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are Required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax" ,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (_req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    // Generate OTP
    const otp = Number(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 20 * 60 * 1000; // 20 minutes
    console.log("ottttttp", user.VerifyOtp);

    await user.save();
    console.log("helllooooo", user);

    console.log("OTP generated:", otp);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent to email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Verify Email via OTP (using email, not userId)
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.json({ success: false, message: "Missing details" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check OTP exists
    if (!user.verifyOtp) {
      console.log("sfsdf", user);
      return res.json({
        success: false,
        message: "No OTP found. Please request again",
      });
    }

    // Check expiry
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    // Compare OTP
    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // Success
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// authenicated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
      email: req.email, // ✅ comes from middleware
      message: "User is authenticated",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Send Reset Password OTP
export const sendResetOtp = async (req, res)=>{
const {email} =  req.body;


if(!email){
  return res.json({success: false, message: 'Email is Required'})
}

try {
const user = await userModel.findOne({email});
if(!user){
  return res.json({ success: false, message: 'User not found' });
}


    const otp = Number(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; 
    console.log("ottttttp", user.resetOtp);

    await user.save();
    console.log("helllooooo", user);

    console.log("OTP generated:", otp);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to procced with resetting your password.`
    };

    await transporter.sendMail(mailOptions);
   
    return res.json({success: true, message: 'OTP sent to your email' });

}catch (error) {

  return res.json({ success: false, message: error.message});
}
}

//  Reset user password
export const resetPassword = async (req, res)=>{
  const {email, otp, newPassword} = req.body;

  if(!email || !otp || !newPassword){
    return res.json({ success: false, message: 'Email, OTP, and new password are required' });
  
  }

  try {

    const user = await userModel.findOne({email});
    if(!user){
      return res.json({ success: false, message: 'User not Found '});
    }

    if(user.resetOtp === "" || user.resetOtp !== otp){
      return res.json({ success: false, message: 'Invalid OTP '});
    }

     if(user.resetOtpExpireAt < Date.now()){
      return res.json({ success: false, message: 'OTP Expired'});
     }
 
     const hashedPassword = await bcrypt.hash(newPassword, 10);

     user.password = hashedPassword;
     user.resetOtp = '';
     user.resetOtpExpireAt = 0;

     await user.save();

     return res.json({ success: true, message: 'Password has been reset successfully'});

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
