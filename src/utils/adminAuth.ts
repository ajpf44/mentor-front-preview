
/**
 * Simple admin authentication utility
 * In a real application, this would use proper authentication tokens and backend validation
 */

export const isAdminLoggedIn = (): boolean => {
  return localStorage.getItem("admin_session") === "true";
};

export const loginAdmin = (username: string, password: string): boolean => {
  // Simple mock login - in a real app, this would validate against a backend
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("admin_session", "true");
    return true;
  }
  return false;
};

export const logoutAdmin = (): void => {
  localStorage.removeItem("admin_session");
};
