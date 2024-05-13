
export const timeSlots = ["8-9", "9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20"];
export const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const rooms = ["L-1", "L-2", "L-3", "L-4", "L-5", "L-6", "L-7", "L-8", "L-9", "L-10", "L-11", "L-12", "L-13", "L-14", "L-15", "L-16", "L-17", "L-18", "L-19", "L-20"]

export const courseCodes = ["EL2001", "EL2002","EL2003","EL2004", "CS3004", "ECE3004", "PROD4003"];
export const teacherNames = ["Balwinder Singh", "Amandeep Kaur", "Dhiraj Bharat", "Raman Singh", "Kriti Jain"];
export const departments = ["CSE", "EE", "ECE", "MECH", "AERO", "META", "CIVIL", "PROD"];
export const batches = ["G1", "G2", "G3", "G4", "G5", "EE1", "EE5"];
export const electiveTypes=["DEC1","DEC2","DEC3","DEC4","OE1","OE2","OE3"];
export const years = ["1st", "2nd", "3rd", "4th"];
export const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
export const courseTypes = ["Lecture", "Tutorial", "Practical"];
// export const courseName=["Mechatronics","Power System","Operations and Control",""]

export const isIntervalWithin = (smallInterval, bigInterval) => {
  const [start1, end1] = smallInterval.split('-').map(Number);
  const [start2, end2] = bigInterval.split('-').map(Number);
  return start1 >= start2 && end1 <= end2;
};


export const getAvailableRooms = (allRooms, bookedRooms) => {
  // Create a set from the bookedRooms for faster lookup
  const bookedSet = new Set(bookedRooms);

  // Filter out items from allRooms that are not in bookedSet
  const uniqueItems = allRooms.filter(item => !bookedSet.has(item));

  return uniqueItems;
}

const isPresent = (item, itemList) => {
  for (const bigItem of itemList) {
    if (isIntervalWithin(item, bigItem)) {
      return true;
    }
  }
  return false;
}

export const getAvailableTimeSlots = (allSlots, bookedSlots) => {
  const bookedSet = new Set(bookedSlots);
  const uniqueItems = allSlots.filter(slot => !isPresent(slot, bookedSet));
  return uniqueItems;
}

export const concatinatedString = (data) => {
  const concatStr=Object.values(data).join(' ');
  return concatStr.toLowerCase();
 }

 export const concatenateFirstLetters=(inputString)=>{
  // Split the input string into an array of words
  const words = inputString.split(' ');

  // Extract the first letter of each word, convert to uppercase, and join with a space
  const concatenatedString = words.map(word => word.charAt(0).toUpperCase()).join('');

  return concatenatedString;
}