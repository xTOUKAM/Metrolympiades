<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from '@/utils';

const router = useRouter();
const loginData = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  // Réinitialiser les erreurs avant chaque nouvelle tentative
  errors.value.email = "";
  errors.value.password = "";

  try {
    const data = await fetchData("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData.value),
    });

    // Si la réponse est correcte, on stocke les données
    localStorage.setItem("teamName", data.team.name);
    localStorage.setItem("authToken", data.token);
    alert("Connexion réussie !");
    router.push("/");
  } catch (error) {
    console.error(error);
    
    // Vérifier l'erreur et afficher un message approprié
    if (error.message.includes("email")) {
      errors.value.email = "Email incorrect ou inexistant.";
    } else if (error.message.includes("password")) {
      errors.value.password = "Mot de passe incorrect.";
    } else {
      alert("Impossible de récupérer les informations du serveur. Veuillez réessayer plus tard.");
    }
  }
};

const goToRegister = () => {
  router.push("/register");
}
</script>

<template>
  <div class="login-page">
    <h1>Connexion</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="loginData.email" required />
        <!-- Afficher l'erreur sous le champ email si une erreur existe -->
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="loginData.password" required />
        <!-- Afficher l'erreur sous le champ mot de passe si une erreur existe -->
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button class="login-button">Connexion</button>
    </form>
    <button @click="goToRegister" class="link-button">
      Pas encore de compte ? Je m'inscris
    </button>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 12px;
}
</style>
