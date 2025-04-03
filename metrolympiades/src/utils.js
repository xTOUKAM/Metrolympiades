import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const isLoggedIn = ref(false);
  const teamName = ref("");
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    isLoggedIn.value = !!token;
    if (isLoggedIn.value) {
      teamName.value = localStorage.getItem("teamName") || "Nom introuvable";
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("teamName");
    router.push("/login");
  };

  return { isLoggedIn, teamName, checkAuth, logout };
};

export const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error("Erreur API :", error);
    throw error;
  }
};

// Fonction pour vérifier si un formulaire est valide
export const useFormValidation = (fields) => {
    return computed(() => {
      return Object.values(fields).every((field) => field.trim() !== "");
    });
  };
  
  // Gestion de la navigation
  export const useNavigation = () => {
    const router = useRouter();
    const navigate = (route) => {
      router.push(route);
    };
    return { navigate };
  };
  