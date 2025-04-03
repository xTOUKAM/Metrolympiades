<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const loginData = ref ({
    email: "",
    password: "",
});

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData.value),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Sauvegarde le nom de l'équipe dans localStorage
      localStorage.setItem("teamName", data.team.name);
      
      // Sauvegarde l'utilisateur et d'autres données si nécessaire
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("authToken", data.token);
      
      alert("Connexion réussie !");
      router.push("/"); // Redirige après connexion réussie
    } else {
      const error = await response.json();
      alert(`Erreur : ${error.message}`);
    }
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
    alert("Impossible de se connecter pour le moment.");
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
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="loginData.password" required />
        </div>
        <button class="login-button">Connexion</button>
      </form>
      <button @click="goToRegister" class="link-button">
        Pas encore de compte ? Je m'inscris
      </button>
    </div>
  </template>