const API_URL = 'http://localhost:8080';

export const authService = {
  async loginWithGoogle() {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  },

  async handleOAuthCallback(code: string) {
    try {
      const response = await fetch(`${API_URL}/oauth2/callback/google?code=${code}`);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('auth_token', data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('OAuth callback error:', error);
      return false;
    }
  },

  async logout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }
}; 