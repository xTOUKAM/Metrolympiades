<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  username: "",
  teamName: "",
  email: "",
  password: "",
});

const isSubmitDisabled = computed(() => {
  return (
    !formData.value.username || !formData.value.teamName || !formData.value.email || !formData.value.password
  );
});

const handleSubmit = async () => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      alert("Inscription réussie !");
      router.push("/ranking");
    } else {
      const error = await response.json();
      alert(`Erreur : ${error.message}`);
    }
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    alert("Impossible de s'inscrire pour le moment.");
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
    <div class="register-page">
      <h1>Créer un compte</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Nom d'utilisateur</label>
          <input type="text" id="username" v-model="formData.username" required />
        </div>
        <div class="form-group">
          <label for="teamName">Nom de l'équipe</label>
          <input type="text" id="teamName" v-model="formData.teamName" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="formData.password" required />
        </div>
        <button :disabled="isSubmitDisabled" class="submit-button">S'inscrire</button>
      </form>
      <button @click="goToLogin" class="link-button">Me connecter</button>
    </div>
</template>