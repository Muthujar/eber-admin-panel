



export const formatDate = (dateString) => {
    if (!dateString) return "-"; // Handle case when date is null or undefined
  
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, "0"); // Get the day, padded to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-based, so add 1), padded to 2 digits
    const year = date.getFullYear(); // Get the full year
  
    return `${day}/${month}/${year}`; // Return the formatted date
  };