export function calculateRemainingTime(activation: number, elapsed: number) {
    // Convert activation (hours) to seconds
    const totalDurationInSeconds = activation * 3600;
  
    // Calculate remaining time in seconds
    const remainingTimeInSeconds = totalDurationInSeconds - elapsed;
  
    // Convert remaining time in seconds back to hours, minutes, and seconds
    const remainingSeconds = Math.floor(remainingTimeInSeconds % 60);
  
    return remainingSeconds;
  }


  export function convertHoursToString(total_usage: number): string {
    // Convert total usage (in hours) to total seconds
    const totalSeconds = total_usage * 3600;
  
    // Calculate hours, minutes, and seconds from total seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
  
    // Format the result as "HH:MM:SS"
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  } 