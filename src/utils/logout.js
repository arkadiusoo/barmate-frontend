import { authService } from "../pages/AuthService";

export function handleLogout() {
  authService.logout();
  window.location.href = "/";
}
