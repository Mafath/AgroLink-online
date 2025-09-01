import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"


export const signup = async (req,res) => {
  const { email, fullName, password } = req.body; 
  try {
    
    //check if all fields are filled
    if (!email || !fullName || !password){
      return res.status(400).json({message: "All fields are required"});
    }

    //check password length
    if (password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    
    //check if the email exist already
    const user = await User.findOne({email: email});
    if(user){
      return res.status(400).json({message: "User already exists"});
    }

    //hash the password
    const salt = await bcrypt.genSalt(10) // generates a random string (salt) to make the hash unique.
    const hashedPassword = await bcrypt.hash(password,salt); // Combines the password and salt to generate a secure hashed version of the password.

    //create a new user and save
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    //if user created successfully
    if(newUser){
      //geneterate and return JWT token
      generateToken(newUser._id, res);

      //save the user to the database
      await newUser.save();
  
      //send the user data to the frontend(client)
      res.status(201).json({
        _id:newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic
      })
//       above JSON response allows the frontend to:

//       Confirm that the user has been successfully registered.
//       Access the newly created user's data (e.g., fullName and email).
//       Use the user's _id for further operations like token generation or navigation.
//       Optionally, display or use the profilePic if needed.
    }

    else{ //if couldn't create user
      res.status(400).json({message: "invalid user data"});
    }

  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({message: "Internal server error"});
  }
};

export const login = (req, res) => {
  res.send("login routew")
}

export const logout = (req, res) => {
  res.send("logout routew")
}


