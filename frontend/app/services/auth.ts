const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const authService = {
  async loginWithGoogle() {
    // Store the current URL to redirect back after login
    localStorage.setItem('redirect_after_login', window.location.pathname);

    // Redirect to backend OAuth2 endpoint
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  },

  async handleOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const picture = urlParams.get('picture');
    const email = urlParams.get('email');

    if (token) {
      try {
        // Store all user information in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userName', name || '');
        localStorage.setItem('profilePic', picture || '');
        localStorage.setItem('email', email || '');

        // Get the stored redirect URL or default to home
        const redirectUrl = localStorage.getItem('redirect_after_login') || '/';
        localStorage.removeItem('redirect_after_login');

        // Clean the URL (remove query params) and redirect
        window.history.replaceState({}, document.title, window.location.pathname);
        window.location.href = redirectUrl;
      } catch (error) {
        console.error('Error handling OAuth callback:', error);
        // Fallback to home
        window.location.href = '/';
      }
    }
  },

  async logout() {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('profilePic');
      localStorage.removeItem('email');
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  getUserName() {
    return localStorage.getItem('userName') || '';
  },

  getProfilePic() {
    return localStorage.getItem('profilePic') || '';
  },

  getEmail() {
    return localStorage.getItem('email') || '';
  }
};
