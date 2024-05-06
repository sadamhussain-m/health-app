//import express, express router as shown in lecture code
import { Router } from "express";
import { createUser } from "../data/users.js";
import { checkUser } from "../data/users.js";

import validation from "../helpers.js"

const router=Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    res.render("pages/signup")
  })
  .post(async (req, res) => {
    //code here for POST

    let {
      emailAddressInput,
      passwordInput,
      confirmPasswordInput
    }=req.body

    console.log(req.body)
    // console.log(req.body.emailAddressInput);

    //doing server side validations of all the fields

    if (!emailAddressInput) {

      return res.status(400).render("signup",{message:"Email address is missing"});
    }

    if (!passwordInput) {
      
      return res.status(400).render("signup",{message:"passwordInput is missing"});
    }

    if (!confirmPasswordInput) {
      return res.status(400).render("signup",{message:"confirmPassword is missing"});
    }

    try {
      if (passwordInput !== confirmPasswordInput) {
        throw "Error both the password and confirm password need to be same";
      }
    } catch (e) {
      return res.status(400).render("error",{message:e});
    }

    try {
      let regex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^*?&])[A-Za-z\d@#$!%^*?&]{8,}$/;

      if (!regex.test(passwordInput)) {
        throw "Error password should contain at least one captial letter,special character or number ";
      }

      let regex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!regex2.test(emailAddressInput)) {
        throw "Email address needs to be valid";
      }
    } catch (e) {
      return res.status(400).render("error",{message:e});;
    }
   
    let result = null;
    try {
      result = await createUser(
        emailAddressInput,
        passwordInput,
      );
    } catch (error) {
      return res.status(400).render("error",{message:error });;
    }
    if (result.user) {
      res.redirect("login");
    } else {
      return res.status(400).render("error",{message:"User registration failed"});
    }

  });

router
  .route('/login')
  .get(async (req, res) => {
    
     res.render("pages/login",{message:""})
  })
  .post(async (req, res) => {
    //code here for POST

    let emailAddressInput = req.body.emailAddressInput;
    let passwordInput = req.body.passwordInput;
    try {
      emailAddressInput = validation.checkEmail(emailAddressInput);
      passwordInput = validation.checkPassword(passwordInput);
    } catch (e) {
      return res.status(400).render('pages/login', {title: 'Error', message: e});
    }

    try {
      const user = await checkUser(emailAddressInput, passwordInput);
      req.session.user = {firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddress};
      res.redirect('/dashboard');
    } catch (e) {
      res.status(400).render('pages/login', {title: 'Error', message: e});
    }

  });

router
     .route('/dashboard')
     .get(async (req,res)=>{
      if(req.session.user){
        res.render("pages/dashboard");
      }
      else{
        res.redirect('/login');
      }
     })

     

router.route('/protected').get(async (req, res) => {
  //code here for GET
});

router.route('/admin').get(async (req, res) => {
  //code here for GET
});

router.route('/error').get(async (req, res) => {
  //code here for GET
});

router.route('/logout').get(async (req, res) => {
  //code here for GET

  if (req.session.user) {
    req.session.destroy()
    res.render('pages/logout', {title: "logout"})
  }
});


export default router;