import Cookies from 'js-cookie';
import moment from 'moment';




export const formatDate = (dateString) => {
    if (!dateString) return "-"; // Handle case when date is null or undefined
  
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, "0"); // Get the day, padded to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based, so add 1), padded to 2 digits
    const year = date.getFullYear(); // Get the full year
  
    return `${day}/${month}/${year}`; // Return the formatted date
  };


  export const isLoggedIn = () => {
    return getCookie('Token') ? true : false;
  };


export const setCookie = (name, value, days=7) => {
  const options = { expires: days }; // Set cookie expiration
  Cookies.set(name, value, options);
};

export const getCookie = (name) => {
  return Cookies.get(name); // Return the cookie value
};

export const deleteCookie = (name) => {
  Cookies.remove(name); // Remove the cookie
};


export const convertToUTC=(inputDate)=> {
  const formattedDate = moment(inputDate, "DD-MMM-YY HH:mm").utc().format("YYYY-MM-DD HH:mm:ss");
  return formattedDate;
}