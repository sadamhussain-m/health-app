import express, { json } from 'express'
import { Router } from "express";
import xss from "xss";
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
import * as healthEventData from "../data/health_event.js"
dotenv.config();

const router=Router();

router
    .route("/add")
    .get(async (req, res) => {
    if (!req.session.user) {
      res.redirect('/login');
    }
    try {
      res.render("pages/health_event/add");
    } catch (e) {
      res.status(400).render("pages/person/error", {title: 'error', error: e });
    }
  })

router.route("/eventRegister").post(async(req,res)=>{

  if (!req.session.user) {
    res.redirect('/login');
  }

  let eventDate=xss(req.body.eventDate);

  let eventType=xss(req.body.eventType);

  let eventDescription=xss(req.body.eventDescription);

  let eventConcept=xss(req.body.eventConcept);

  let providerName=xss(req.body.providerName);

  let providerSpeciality=xss(req.body.providerSpeciality);

  let careSiteName=xss(req.body.careSiteName);

  let placeOfService=xss(req.body.placeOfService);

  let careSiteAddress1=xss(req.body.careSiteAddress1);

  let careSiteAddress2=xss(req.body.careSiteAddress2);

  let careSiteCity=xss(req.body.careSiteCity);

  let careSiteState=xss(req.body.careSiteState);

  let careSiteZipCode=xss(req.body.careSiteZipCode);

  try{
  if(!eventDate || !eventType || !eventDescription || !eventConcept || !providerName || !providerSpeciality ||
     !careSiteName || !placeOfService || !careSiteAddress1 || !careSiteAddress2 || !careSiteCity || !careSiteState || !careSiteZipCode){

        throw "Enter all the values for all the fields";
     }

  if(eventDate.trim().length==0 || eventType.trim().length==0 || eventDescription.trim().length==0 || eventConcept.trim().length==0 || providerName.trim().length==0 ||
      providerSpeciality.trim().length==0 || careSiteName.trim().length==0 || placeOfService.trim().length==0 || careSiteAddress1.trim().length==0 || careSiteAddress2.trim().length==0 ||
      careSiteCity.trim().length==0 || careSiteState.trim().length==0 || careSiteZipCode.trim().length==0){
      
     throw  "The entered field values should not be empty or contain white spaces";
  }

  if(eventType!="Diagnosis" || eventType!="Procedure" || eventType!="Drug adminstration"){

    throw "Enter the values of eventType correctly";
  }

  if(eventDescription.length>255 && eventDescription.length<=1000){

    throw "Enter description characters should of 255 min and 1000 max";

  }

  if(eventConcept.length>255){

    throw "Event concept length should be less than 255 characters"
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

  // if(placeOfService!="In-Patient" || placeOfService!="Out-Patient" || placeOfService!="Pharmacy"){

  //   throw "Invalid care site's place of service";
  // }

  if(careSiteCity>255){

    throw "Error careSityCity's city should not be more 255";
  }

  let statesList=['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  if(!statesList.includes(careSiteState)){
    throw "Do not enter the state out of the states list";
  }

  let eventInfo={

    event_date:eventDate,
    event_type_id:eventType,
    event_description:eventDescription,
    event_concept_id:eventConcept,
    provider_id:null,
    care_site_id:null
  }

  let providerInfo={

    provider_name:providerName,
    speciality:providerSpeciality,    
  }

  let careSiteLocationInfo={

    address1:careSiteAddress1,
    address2:careSiteAddress2,
    city:careSiteCity,
    state:careSiteState,
    zipcode:careSiteZipCode
  }

  let careSiteInfo={

    care_site_name:careSiteName,
    place_of_service_concept:placeOfService,
    caresite_location_id:null     
  }

  try {
    const newEventId=await healthEventData.create(eventInfo,providerInfo,careSiteLocationInfo,careSiteInfo);
  } catch (error) {
    
  }
  }
  catch (error) {
    return res.status(400).render("pages/event/error",{title: 'error', message:error});
}
})




export default router;
