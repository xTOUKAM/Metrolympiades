<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from '@/utils';

const router = useRouter();
const loginData = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const data = await fetchData("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData.value),
    });
    localStorage.setItem("teamName", data.team.name);
    localStorage.setItem("authToken", data.token);
    alert("Connexion réussie !");
    router.push("/");
  } catch (error) {
    alert(`Erreur : ${error.message}`);
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