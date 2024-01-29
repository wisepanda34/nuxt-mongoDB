// composables/useUserExit.js
import { useAuth } from "@/store/auth";

export default function useUserExit() {
  const authStore = useAuth();
  authStore.logout();
  navigateTo("/login");
}