const BACKEND_URL = 'http://localhost:8080';
const FRONTEND_URL = 'http://localhost:3000';

export const authService = {
  async loginWithGoogle() {
    // Store the current URL to redirect back after login
    localStorage.setItem('redirect_after_login', window.location.pathname);
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  },

  handleAuthRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');

    if (token) {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_name', name || '');
      
      // Get the stored redirect URL or default to home
      const redirectUrl = localStorage.getItem('redirect_after_login') || '/';
      localStorage.removeItem('redirect_after_login');
      
      // Remove the token from URL and redirect
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = redirectUrl;
      return true;
    }
    return false;
  },

  async handleOAuthCallback(code: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/oauth2/callback/google?code=${code}`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.token);
        
        // Get the stored redirect URL or default to home
        const redirectUrl = localStorage.getItem('redirect_after_login') || '/';
        localStorage.removeItem('redirect_after_login');
        window.location.href = redirectUrl;
        return true;
      }
      return false;
    } catch (error) {
      console.error('OAuth callback error:', error);
      return false;
    }
  },

  async logout() {
    try {
      await fetch(`${BACKEND_URL}/logout`, {
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_name');
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  },

  getUserName() {
    return localStorage.getItem('user_name') || '';
  }
}; 