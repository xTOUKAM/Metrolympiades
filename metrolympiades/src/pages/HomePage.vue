<script setup>
import SideBar from '@/components/SideBar.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/utils';

const router = useRouter();

const { isLoggedIn, teamName, checkAuth } = useAuth();

checkAuth();

const navigateToLogin = () => {
  router.push("/login");
};
</script>



<template>
  <div class="home-page">
    <SideBar />
    <main>
      <h1 v-if="isLoggedIn">Bienvenue, {{ teamName }}</h1>
      <h1 v-else>Bienvenue sur Metrolympiades</h1>
      <p v-if="isLoggedIn" class="description">
        Accédez au classement général, gérez votre équipe, et découvrez vos prochains matchs.
      </p>
      <p v-else class="description">
        Découvrez les classements et connectez-vous pour accéder à toutes les fonctionnalités !
      </p>
      <button
        v-if="!isLoggedIn"
        class="cta-button"
        @click="navigateToLogin">
        Se connecter
      </button>
    </main>
  </div>
</template>
