/**
 * the function is used to format a given date.
 * For a question posted on Day X, 
 * the post date should appear in seconds (if posted 0 mins. ago), 
 * minutes (if posted 0 hours ago), 
 * or hours (if posted less than 24 hours ago). 
 * The displayed string should read "<Month><day> at <hh:min>"
 * after 24 hours of posting. 
 * Date should be displayed as "<Month><day>, <year> at <hh:min>"
 * if viewed after a year of posting.
 * @param date 
 * @returns {string} - formatted string which indicates the date and time of the post
 */
const getMetaData = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  
  const postYear = date.getFullYear();
  const currentYear = now.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  
  if (currentYear === postYear) {
    return `${month} ${day} at ${formattedTime}`;
  } else {
    return `${month} ${day}, ${postYear} at ${formattedTime}`;
  }
};


export { getMetaData };
