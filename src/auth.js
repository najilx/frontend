export function login(tokenObj) {
    // tokenObj = { access: "...", refresh: "..." }
    localStorage.setItem('access_token', tokenObj.access);
    localStorage.setItem('refresh_token', tokenObj.refresh);
  }
  
  export function logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
  
  export function isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
  