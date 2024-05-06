//import mongo collections, bcrypt and implement the following data functions

// import {run} from "../config/mongoConnection.js"
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";
import { dbConnection } from "../config/mongoConnection.js";

export const createUser = async (
  emailAddress,
  password,
) => {
  
  if (!emailAddress || !password ) {
    throw "Error all the fields must be supplied";
  }
  

  const db = await dbConnection();
  const userCollection = await users();

  emailAddress = emailAddress.toLowerCase();

  const existingUser = await userCollection.findOne({
    emailAddress: emailAddress,
  });

  if (existingUser != null) {
    throw "Error email address is already taken";
  }

  if (password.trim().length == 0) {
    throw "Error password should not be empty or contains empty spaces";
  }

  if (password.trim().length < 8) {
    throw "Error password should be minimum 8 characters long";
  }

  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&])[A-Za-z\d@#$!%^*?&]{8,}$/;

  if (!regex.test(password)) {
    throw "Error password should contain at least one captial letter,special character or number ";
  }

  let newUser = {
    emailAddress: emailAddress,
    password: password
  };
  // let hashedPassword;
  const hash = await bcrypt.hash(password, 10);

  newUser.password = hash;

  const insertedInfo = await userCollection.insertOne(newUser);

  if (!insertedInfo.acknowledged || !insertedInfo.insertedId) {
    throw "could not insert the record";
  }

  const newUserObj = {
    _id: insertedInfo.insertedId,
    emailAddress: emailAddress,
  };

  return { user: newUserObj };
};

export const checkUser = async (emailAddress, password) => {
  if (!emailAddress || !password) {
    throw "Error should enter both emailAddress and password";
  }

  if (password.trim().length == 0) {
    throw "Error password should not be empty or contains empty spaces";
  }

  if (password.trim().length < 8) {
    throw "Error password should be minimum 8 characters long";
  }

  let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&])[A-Za-z\d@#$!%^*?&]{8,}$/;

  if (!regex.test(password)) {
    throw "Error password should contain at least one captial letter,special character or number ";
  }

  let regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!regex2.test(emailAddress)) {
    throw "Email address needs to be valid";
  }

  emailAddress = emailAddress.toLowerCase();

  const userCollection = await users();

  const existingUser = await userCollection.findOne({
    emailAddress: emailAddress,
  });

  if (existingUser == null) {
    throw "Either the email address or password is invalid.";
  } else {
    let hash = existingUser.password;
    let result = await bcrypt.compare(password, hash);

    if (result == true) {
      return {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        emailAddress: existingUser.emailAddress,
        role: existingUser.role,
      };
    } else {
      throw "Either the email address or password is invalid";
    }
  }
};