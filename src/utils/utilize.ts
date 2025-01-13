export function calculateRemainingTime(availability: number, elapsed: number) {
    // Convert availability (hours) to seconds
    const totalDurationInSeconds = availability * 3600;
  
    // Calculate remaining time in seconds
    const remainingTimeInSeconds = totalDurationInSeconds - elapsed;
  
    // Convert remaining time in seconds back to hours, minutes, and seconds
    const remainingSeconds = Math.floor(remainingTimeInSeconds % 60);
  
    return remainingSeconds;
  }


  export function convertHoursToString(total_execute: number): string {
    // Convert total usage (in hours) to total seconds
    const totalSeconds = total_execute;
  
    // Calculate hours, minutes, and seconds from total seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
  
    // Format the result as "HH:MM:SS"
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } 


  export function formatDate_1 (dateString: string): string  {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}:${month}:${day}`;
  };