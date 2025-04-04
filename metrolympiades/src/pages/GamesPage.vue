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
    throw new Error("Utilisateur non authentifié.");
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
                <span class="time">{{ new Date(match.startedAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) }}</span>
              </div>
              <div class="scoreboard">
                <!-- Ton équipe -->
                <div :class="{ team: true, winner: match.team1Score > match.team2Score }">
                  <span class="team-name">{{ teamName }}</span>
                  <span class="score">{{ match.team1Score }}</span>
                </div>
                <!-- Équipe adverse -->
                <div :class="{ team: true, winner: match.team2Score > match.team1Score }">
                  <span class="team-name">{{ match.team2 }}</span>
                  <span class="score">{{ match.team2Score }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </template>
  
<style>
/* Page principale */
.matches-page {
  display: flex;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #121212;
  color: #e0e0e0;
  text-align: center;
}

/* Titre */
.title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}

/* Messages */
.loading-message,
.error-message,
.no-matches-message {
  font-size: 1.2rem;
  margin: 20px 0;
  color: #b0b0b0;
}

/* Liste des matchs */
.matches-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 600px;
}

/* Carte de match */
.match-card {
  background-color: #1e1e1e;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Activité et heure */
.match-info {
  display: flex;
  gap: 10px;
  font-size: 1.2rem;
  color: #b0b0b0;
  margin-bottom: 10px;
}

.activity {
  font-weight: bold;
  color: #ffffff;
}

.time {
  color: #b0b0b0;
}

/* Scoreboard */
.scoreboard {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.team {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #2c2c2c;
  border-radius: 6px;
}

.team-name {
  font-size: 1.2rem;
  font-weight: bold;
}

.team .score {
  font-size: 2rem;
  font-weight: bold;
  color: #b0b0b0;
}

.winner {
  color: #007bff; /* Bleu pour indiquer la victoire */
}
</style>