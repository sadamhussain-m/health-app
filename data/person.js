import {location as locationCollection} from "../config/mongoCollections.js";

import {provider as providerCollection} from "../config/mongoCollections.js"

import {person as personCollection} from "../config/mongoCollections.js"

const create=async(personData,personLocationData,careSiteLocationData,providerData,careSiteData)=>{

    let {first_name,last_name,gender_concept_id,day_of_birth,month_of_birth,year_of_birth,location_id,provider_id,care_site_id}=personData;

    let {person_address1,person_address2,person_city,person_state,person_zipcode}=personLocationData;

    let {address1,address2,city,state,zipcode}=careSiteLocationData;

    let {provider_name,speciality}=providerData;

    let {care_site_name,place_of_service_concept,caresite_location_id}=careSiteData;

    const SECRET_KEY=process.env.SECRET_KEY;

    const cryptr=new Cryptr(SECRET_KEY);

    gender_concept_id=cryptr.encrypt(gender_concept_id);

    place_of_service_concept=cryptr.encrypt(place_of_service_concept);


    const newPersonLocation={
        
        address_1:person_address1,
        address_2:person_address2,
        city:person_city,
        state:person_state,
        zipcode:person_zipcode
    }

    const locationCollection=await locationCollection();

    const insertedPersonLocationInfo = await locationCollection.insertOne(newPersonLocation);
    if (insertedPersonLocationInfo.insertedCount === 0) throw 'Could not person location';
    
    let personLocationId = insertInfo.insertedId;

    personLocationId=cryptr.encrypt(personLocationId);

    const newCareSiteLocation={

        address_1:address1,
        address_2:address2,
        city:city,
        state:state,
        zipcode:zipcode
    }

    const insertedCaresiteLocationInfo=await locationCollection().insertOne(newCareSiteLocation);

    if (insertedCaresiteLocationInfo.insertedCount === 0) throw 'Could not add caresite location';
    
    let careSiteLocationId = insertedCaresiteLocationInfo.insertedId;

    insertedCaresiteLocationInfo=cryptr.encrypt(insertedCaresiteLocationInfo);

    let provider={
        
        provider_name:provider_name,
        speciality:speciality
    }

    const insertedProviderInfo=await providerCollection(provider)

    insertedProviderInfo=cryptr.encrypt(insertedProviderInfo);

    if(insertedProviderInfo.insertedCount ===0) throw 'Could not add caresite location';

    let providerId=insertedProviderInfo.insertedId;

    let person={

        gender_concept_id:gender_concept_id,
        first_name:first_name,
        last_name:last_name,
        day_of_birth:day_of_birth,
        month_of_birth:month_of_birth,
        year_of_birth:year_of_birth,
        location_id:insertedPersonLocationInfo,
        provider_id:insertedProviderInfo,
        care_site_id:insertedCaresiteLocationInfo       
    }

    let insertedPersonInfo=await personCollection(person);

    if(insertedPersonInfo.insertedCount ===0) throw 'Could not add caresite location';
    
    let personId=insertedPersonInfo.insertedId;

    return personId;
}


export {

    create
}