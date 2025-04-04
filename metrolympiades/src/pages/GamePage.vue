<script setup>
import SideBar from '@/components/SideBar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { fetchData } from '@/utils';

const router = useRouter();

const matchData = ref({
  team2Id: "",
  activityId: "",
  startedAt: "",
  team1Score: 0,
  team2Score: 0,
});

const userTeamId = ref("");
const teams = ref([]);
const activities = ref([]);
const errorMessage = ref("");

// Vérifier la connexion de l'utilisateur
const checkAuthentication = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    router.push("/login");
    return;
    throw new Error("Utilisateur non authentifié.");
  }
};

// Fonction pour récupérer les équipes disponibles
const fetchTeams = async () => {
  try {
    checkAuthentication();

    const token = localStorage.getItem("authToken");
    const data = await fetchData("http://localhost:3000/teams", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    teams.value = data.filter((team) => team.id !== userTeamId.value);
  } catch (error) {
    errorMessage.value = `Erreur lors de la récupération des équipes : ${error.message}`;
  }
};

// Fonction pour récupérer les activités disponibles
const fetchActivities = async () => {
  try {
    checkAuthentication();

    const token = localStorage.getItem("authToken");
    const data = await fetchData("http://localhost:3000/activities", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    activities.value = data;
  } catch (error) {
    errorMessage.value = `Erreur lors de la récupération des activités : ${error.message}`;
  }
};

// Fonction pour récupérer l'équipe de l'utilisateur
const fetchUserTeam = async () => {
  try {
    checkAuthentication();

    const token = localStorage.getItem("authToken");
    const data = await fetchData("http://localhost:3000/teams/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    userTeamId.value = data.id;
  } catch (error) {
    errorMessage.value = `Erreur lors de la récupération de votre équipe : ${error.message}`;
  }
};

// Fonction pour créer un match
const createMatch = async () => {
  try {
    checkAuthentication();

    const token = localStorage.getItem("authToken");
    await fetchData("http://localhost:3000/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(matchData.value),
    });

    alert("Match créé avec succès !");
    router.push("/games");
  } catch (error) {
    errorMessage.value = `Erreur : ${error.message}`;
  }
};

// Récupérer les données nécessaires au montage
onMounted(() => {
  checkAuthentication();
  fetchUserTeam();
  fetchTeams();
  fetchActivities();
});
</script>

<template>
  <div class="match-creation-page">
    <SideBar />
    <main>
      <h1>Créer un match</h1>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="createMatch" class="match-form">
        <!-- Liste déroulante pour les équipes adverses -->
        <div class="form-group">
          <label for="team2Id">Sélectionnez l'équipe adverse</label>
          <select id="team2Id" v-model="matchData.team2Id" required>
            <option value="" disabled>Choisissez une équipe</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>

        <!-- Liste déroulante pour les activités -->
        <div class="form-group">
          <label for="activityId">Sélectionnez une activité</label>
          <select id="activityId" v-model="matchData.activityId" required>
            <option value="" disabled>Choisissez une activité</option>
            <option v-for="activity in activities" :key="activity.id" :value="activity.id">
              {{ activity.name }}
            </option>
          </select>
        </div>

        <!-- Champ pour la date et l'heure du match -->
        <div class="form-group">
          <label for="startedAt">Date et heure du match</label>
          <input id="startedAt" v-model="matchData.startedAt" type="datetime-local" required />
        </div>

        <!-- Score de l'équipe -->
        <div class="form-group">
          <label for="team1Score">Score de votre équipe</label>
          <input id="team1Score" v-model="matchData.team1Score" type="number" required />
        </div>

        <!-- Score de l'équipe adverse -->
        <div class="form-group">
          <label for="team2Score">Score de l'équipe adverse</label>
          <input id="team2Score" v-model="matchData.team2Score" type="number" required />
        </div>

        <button class="submit-button" type="submit">Créer le match</button>
      </form>
    </main>
  </div>
</template>

<style>
.match-creation-page {
  display: flex;
}

/* Contenu principal */
main {
  flex: 1;
  padding: 20px;
  background-color: #121212;
  color: #e0e0e0;
}

main h1 {
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
}

/* Gestion des erreurs */
.error-message {
  color: #ff4d4d;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Formulaire */
.match-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

select,
input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #2c2c2c;
  color: #e0e0e0;
}

button.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button.submit-button:hover {
  background-color: #0056b3;
}
</style>