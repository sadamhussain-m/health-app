import express, { json } from 'express'
import { Router } from "express";
import xss from "xss";
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import * as personData from "../data/person.js"
dotenv.config();

const router=Router();


router
    .route("/add")
    .get(async (req, res) => {
    if (!req.session.user) {
      res.redirect('/login');
    }
    try {
      res.render("pages/person/add");
    } catch (e) {
      res.status(400).render("pages/person/error", {title: 'error', error: e });
    }
  })

router.route("/personRegister").post(async(req,res)=>{

  if (!req.session.user) {
    res.redirect('/login');
  }

  let firstName=xss(req.body.firstName);
  
  let lastName=xss(req.body.lastName)

  let gender=xss(req.body.gender)

  let personDob=xss(req.body.personDob)

  let personAddress1=xss(req.body.personAddress1)

  let personAddress2=xss(req.body.personAddress2)

  let personCity=xss(req.body.personCity)

  let personState=xss(req.body.personState)

  let personZipCode=xss(req.body.personZipCode)

  let providerName=xss(req.body.providerName)

  let providerSpeciality=xss(req.body.providerSpeciality)

  let careSiteName=xss(req.body.careSiteName)

  let placeOfService=xss(req.body.placeOfService)

  let careSiteAddress1=xss(req.body.careSiteAddress1)

  let careSiteAddress2=xss(req.body.careSiteAddress2)

  let careSiteCity=xss(req.body.careSiteCity)

  let careSiteState=xss(req.body.careSiteState)

  let careSiteZipCode=xss(req.body.careSiteZipCode)

  try{

    if(!firstName || !lastName || !gender || !personDob || !personAddress1 || !personAddress2 || !personCity || !personState || !personZipCode 
       || !providerName || !providerSpeciality || !careSiteName || !placeOfService || !careSiteAddress1 || !careSiteAddress2 || !careSiteCity || !careSiteState || !careSiteZipCode){

          throw "Enter all the fields";
    }

    if(firstName.trim().length==0 || lastName.trim().length==0  || gender.trim().length==0 || personDob.trim().length==0 ||
      personAddress1.trim().length==0 || personAddress2.trim().length==0 || personCity.trim().length==0 || personState.trim().length==0 || personZipCode.trim().length==0 || providerName.trim().length==0 ||
    providerSpeciality.trim().length==0 || careSiteName.trim().length==0 || placeOfService.trim().length==0 || careSiteAddress1.trim().length==0 || careSiteAddress2.trim().length==0 || careSiteCity.trim().length==0 || careSiteState.trim().length==0 || careSiteZipCode.trim().length==0){

      throw "The entered field values should not be empty or contain white spaces";
    }

    if(firstName.length > 25){

      throw "Error firstName length should be upto 25 characters"
    }

    if(lastName.length > 25){

      throw "Error firstName length should be upto 25 characters"
    }

    if(!((gender=="Male") || (gender=="Female") )){
      throw "The gender needs to be either Male,Female";
    }

    const personDOB=new Date(personDob);

    // if(!isNaN(personDOB) && personDOB.toString()){
    //   throw "Invalid date"
    // }

    if(personAddress1.length > 255){

      throw "Error person's address 1 should not be more 255";
    }
    
    if(personAddress2.length >255){

      throw "Error person's address 2 should not be more than 255";
    }

    if(personCity>255){
      throw "Error person's city should not be more 255";
    }

    let statesList=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    if(!statesList.includes(personState)){
      throw "Do not enter the state out of the states list";
    }

    if(providerName.length>255){

      throw "Error provider name's length should not be more than 255";
    }

    if(providerSpeciality.length>50){

      throw "Error speciality's length should not be more than 50";
    }

    if(careSiteName.length>=255){

      throw "care site name should be lesser than 255";
    }

    if(placeOfService!="In-Patient" || placeOfService!="Out-Patient" || placeOfService!="Pharmacy"){

      throw "Invalid care site's place of service";
    }

    if(careSiteCity>255){

      throw "Error careSityCity's city should not be more 255";
    }

    
    if(!statesList.includes(careSiteState)){
      throw "Do not enter the state out of the states list";
    }

    const dayOfBirth=personDOB.getDate();

    const monthOfBirth=personDOB.getMonth();

    const yearOfBirth=personDOB.getFullYear();
   

    let personInfo={

      first_name:firstName,
      last_name:lastName,
      gender_concept_id:gender,
      day_of_birth:dayOfBirth,
      month_of_birth:monthOfBirth,
      year_of_birth:yearOfBirth,
      location_id:null,
      provider_id:null,
      care_site_id:null
      
    }

    let personLocationInfo={

      person_address1:personAddress1,
      person_address2:personAddress2,
      person_city:personCity,
      person_state:personState,
      person_zipcode:personZipCode
    }
    
    let careSiteLocationInfo={

      address1:careSiteAddress1,
      address2:careSiteAddress2,
      city:careSiteCity,
      state:careSiteState,
      zipcode:careSiteZipCode
    }

    let providerInfo={

      provider_name:providerName,
      speciality:providerSpeciality,
    }

    let careSiteInfo={

      care_site_name:careSiteName,
      place_of_service_concept:placeOfService,
      caresite_location_id:null     
    }

    try{
      const newPersonId= await personData.create(personInfo,personLocationInfo,careSiteLocationInfo,providerInfo,careSiteInfo);

      return res.json.toString(newPersonId);
    }
    catch(error){

    }
  }
  catch (error) {
      return res.status(400).render("pages/person/error",{title: 'error', message:error});
  }
  
})


export default router;