// Store token in localStorage
export const setAuthToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  export const setUserInfo = (user: any) => {
    const userString = JSON.stringify(user);
    localStorage.setItem('userInfo', userString);
  };
  
  // Get token from localStorage
  export const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  
  // Remove token from localStorage
  export const removeAuthToken = () => {

    localStorage.removeItem('authToken');
  };

  export const removeUserInfo = () => {
    
    localStorage.removeItem('userInfo');
  };