// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

let form = document.querySelector(".personadd-form");

let firstName=document.getElementById("firstName");
let lastName=document.getElementById("lastName");
let gender=document.getElementById("gender");
let personDob=document.getElementById("personDob");
let personAddress1=document.getElementById("personAddress1");
let personAddress2=document.getElementById("personAddress2");
let personCity=document.getElementById("personCity");
let personState=document.getElementById("personState");
let personZipCode=document.getElementById("personZipCode");


let firstNameError=document.getElementById("firstNameError");
let lastNameError=document.getElementById("lastNameError");
let genderError=document.getElementById("genderError");
let personDobError=document.getElementById("personDobError");
let personAddressError1=document.getElementById("personAddressError1");
let personAddressError2=document.getElementById("personAddressError2");
let personCityError=document.getElementById("cityError");
let personStateError=document.getElementById("stateError");
let personZipCodeError=document.getElementById("zipCodeError");


let providerName=document.getElementById("providerName");
let providerSpeciality=document.getElementById("providerSpeciality");

let providerNameError=document.getElementById("providerNameError");
let providerSpecialityError=document.getElementById("providerSpecialityError");


let careSiteName=document.getElementById("careSiteName");
let placeOfService=document.getElementById("placeOfService");
let careSiteAddress1=document.getElementById("careSiteAddress1");
let careSiteAddress2=document.getElementById("careSiteAddress2");
let careSiteCity=document.getElementById("careSiteCity");
let careSiteState=document.getElementById("careSiteState");
let careeSiteZipCode=document.getElementById("careSiteZipCode");

let careSiteNameError=document.getElementById("careSiteNameError");
let placeOfServiceError=document.getElementById("placeOfServiceError");
let careSiteAddressError1=document.getElementById("careSiteAddressError1");
let careSiteAddressError2=document.getElementById("careSiteAddressError2");
let careSiteCityError=document.getElementById("careSiteCityError");
let careSiteStateError=document.getElementById("careSiteStateError");
let careeSiteZipCodeError=document.getElementById("careSiteZipCodeError");

let firstNameCheck=false;
let lastNameCheck=false;
let genderCheck=false;
let dobCheck=false;
let personAddress1Check=false
let personAddress2Check=false;
let personCityCheck=false;
let personStateCheck=false;
let personZipCodeCheck=false;

let providerNameCheck=false;
let providerSpecialityCheck=false;

let careSiteNameCheck=false;
let placeOfServiceCheck=false;
let careSiteAddress1Check=false;
let careSiteAddress2Check=false;
let careSiteCityCheck=false;
let careSiteStateCheck=false;
let careSiteZipCodeCheck=false;

const addressRegex = /^[0-9a-zA-Z\s,'-]*$/;
const cityRegex = /^[a-zA-Z\s]+$/i;

const statesArray = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  
let preventEvent = true;

function personValidator(){

    console.log("hello world")
   
    if(!firstName.value || firstName.value.trim().length==0){
        firstNameCheck=false;
        firstNameError.hidden=false;
        firstNameError.textContent="First Name should not be empty";
    }
    else{
        firstNameError.hidden=true;
        firstNameCheck=true;
    }

    if(!lastName.value || lastName.value.trim().length==0){
        lastNameCheck=false;
        lastNameError.hidden=false;
        lastNameError.textContent="First Name should not be empty";
    }
    else{
        lastNameError.hidden=true;
        lastNameCheck=true;
    }
    

    if (!gender.value || gender.value.trim() == '') {
        genderError.hidden = false;
        genderError.textContent = "Gender cannot be empty";
        genderCheck = false;
    } else if (gender.value != "Male" && gender.value != "Female") {
        genderError.hidden = false;
        genderError.textContent = "Gender cannot be other than Male/Female";
        genderCheck = false;
    } else {
        genderError.hidden = true;
        genderCheck = true;
    }
    
    if (!personAddress1.value || personAddress1.value.trim() == '') {
        personAddressError1.hidden = false;
        personAddressError1.textContent = "Address cannot be empty";
        personAddress1Check = false;
    } else if (!addressRegex.test(personAddress1.value)) {
        personAddressError1.hidden = false;
        personAddressError1.textContent = "Address can only be letters, numbers, whitespace, - or '";
        personAddress1Check = false;
    } else {
        personAddressError1.hidden = true;
        personAddress1Check = true;
    }

    if (!personCity.value || personCity.value.trim() == "") {
        personCityError.hidden = false;
        personCityError.textContent = "City cannot be empty";
        personCityCheck = false;
    } else if (!cityRegex.test(personCity.value)) {
        personCityError.hidden = false;
        personCityError.textContent = "City cannot have numbers or special characters";
        personCityCheck = false;
    } else {
        personCityError.hidden = true;
        personCityCheck = true;
    }

    if (!personstate.value || state.value.trim() == "") {
        stateError.hidden = false;
        stateError.textContent = "State cannot be empty";
        stateCheck = false;
    } else if (!statesArray.includes(state.value)) {
        personStateError.hidden = false;
        personStateError.textContent = "State must be in US only";
        personStateCheck = false;
    } else {
        personStateError.hidden = true;
        personStateCheck = true;
    }


}