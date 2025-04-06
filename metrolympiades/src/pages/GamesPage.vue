<script setup>
import SideBar from "@/components/SideBar.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "@/utils";

const router = useRouter();
const matches = ref([]);
const errorMessage = ref("");
const isLoading = ref(true);
const teamName = ref(localStorage.getItem("teamName") || "Nom de l'équipe");

// Vérifier la connexion de l'utilisateur
const checkAuthentication = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    router.push("/login");
    return;
  }
};

// Fonction pour récupérer les matchs
const fetchMatches = async () => {
  try {
    checkAuthentication();

    const token = localStorage.getItem("authToken");
    const data = await fetchData("http://localhost:3000/matches/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    matches.value = data;
  } catch (error) {
    errorMessage.value = `Erreur : ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  checkAuthentication();
  fetchMatches();
});
</script>

<template>
  <div class="matches-page">
    <SideBar />
    <main>
      <h1 class="title">Mes matchs</h1>
      <div v-if="isLoading" class="loading-message">Chargement en cours...</div>
      <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-else-if="matches.length === 0" class="no-matches-message">
        <p>Aucun match trouvé pour le moment.</p>
      </div>
      <div v-else>
        <ul class="matches-list">
          <!-- Affichage de chaque match -->
          <li v-for="match in matches" :key="match.id" class="match-card">
            <div class="match-info">
              <span class="activity">{{ match.activity }}</span>
              <span class="date">le {{ new Date(match.startedAt).toLocaleDateString("fr-FR") }}</span>
              <span class="time">à {{ new Date(match.startedAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) }}</span>
            </div>
            <div class="scoreboard">
              <!-- Ton équipe -->
              <div :class="['team', { winner: match.team1Score > match.team2Score }]">
                <span class="team-name">{{ teamName }} | </span>
                <span :class="{'orange-score': match.team1Score > match.team2Score}">{{ match.team1Score }}</span>
              </div>
              <!-- Équipe adverse -->
              <div :class="['team', { winner: match.team2Score > match.team1Score }]">
                <span class="team-name">{{ match.team2 }} | </span>
                <span :class="{'orange-score': match.team2Score > match.team1Score}">{{ match.team2Score }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>
