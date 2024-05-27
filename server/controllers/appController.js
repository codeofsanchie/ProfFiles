import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

import ENV from "../config.js";
import UserModel from "../model/User.model.js";

/** Middleware for Verify User */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the user existance
    let exist = await UserModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check the existing user
    const existUsername = UserModel.findOne({ username })
      .then((user) => {
        if (user) throw { error: "Please use a unique username" };
        return true;
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.CastError) throw err; // Handle cast errors specifically
        throw err; // Rethrow other errors
      });

    // Check for existing email
    const existEmail = UserModel.findOne({ email })
      .then((email) => {
        if (email) throw { error: "Please use a unique email" };
        return true;
      })
      .catch((err) => {
        if (err instanceof mongoose.Error.CastError) throw err; // Handle cast errors specifically
        throw err; // Rethrow other errors
      });

    await Promise.all([existUsername, existEmail]); // Ensure all promises resolve

    if (!password) {
      return res.status(400).send({ error: "Password is required." }); // Add missing validation
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Use await here

      const user = new UserModel({
        username,
        password: hashedPassword,
        profile: profile || "",
        email,
      });

      // Return save result as a response
      await user.save(); // Ensure this operation completes
      res.status(201).send({ msg: "User Registered Successfully" });
    } catch (error) {
      console.error("Failed to save user:", error);
      res.status(500).send({ error: "Unable to register user" });
    }
  } catch (error) {
    console.error("Unhandled error in register:", error);
    res.status(500).send(error);
  }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username }).lean();

    if (!user) {
      return res.status(404).send({ error: "Username not Found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).send({ error: "Password is Incorrect" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      ENV.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).send({
      msg: "Login Successful...",
      username: user.username,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error); // Log the error for debugging
    return res.status(500).send({ error });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(400).send({ error: "Invalid Username" });

    const user = await UserModel.findOne({ username }).lean(); // Use lean() to avoid populating unnecessary fields
    if (!user) return res.status(404).send({ error: "Couldn't Find the User" });

    // Remove password from user
    const { password, ...rest } = user;

    return res.status(200).send(rest); // Changed status code to 200 OK
  } catch (error) {
    console.error("Error fetching user:", error); // Log the error for debugging
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

/** PUT: http://localhost:8080/api/updateUser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    // const id = req.query.id;

    if (!userId) {
      return res.status(401).send({ error: "User Not Found..." });
    }

    const body = req.body;

    // Update the data using async/await
    const result = await UserModel.updateOne({ _id: userId }, body);

    if (result.nModified === 0) {
      return res.status(404).send({ error: "No document was updated." });
    }

    return res.status(200).send({ msg: "Record Updated..." });
  } catch (error) {
    console.error("Error updating user:", error); // Log the error for debugging
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ msg: "Verify Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
  if(req.app.locals.resetSession){
    return res.status(201).send({ flag : req.app.locals.resetSession})
  }
  return res.status(440).send({error : "Session expired!"})
}

// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;

    try {
      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: "Username not Found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

      if (result.nModified === 0) {
        return res.status(404).send({ error: "No document was updated." });
      }

      req.app.locals.resetSession = false; // Reset session
      return res.status(201).send({ msg: "Record Updated..." });

    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).send({ error: "Unable to reset password" });
    }
  } catch (error) {
    console.error("Unhandled error in resetPassword:", error);
    return res.status(401).send({ error });
  }
}

