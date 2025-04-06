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
    const headers = {
      ...options.headers,
    };

    const token = localStorage.getItem("authToken");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Si la réponse est une erreur (code HTTP > 400)
      const error = await response.json();
      throw new Error(error.message || "Erreur inconnue.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    throw error; // Propager l'erreur pour qu'elle soit gérée dans le composant
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
      if (route === "/logout") {
        localStorage.clear();
        router.push("/");
      } else {
        router.push(route);
      }
    };
    return { navigate };
  };
  