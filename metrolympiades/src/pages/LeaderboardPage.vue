<script setup>
import 'material-design-icons/iconfont/material-icons.css';
import SideBar from '@/components/SideBar.vue';
import { onMounted } from 'vue';

const fetchRanking = async () => {
  try {
    const response = await fetch("http://localhost:3000/ranking", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok) {
      const data = await response.json();
      teams.value = data;
    } else {
      const error = await response.json();
      errorMessage.value = `Erreur : ${error.message}`;
    }
  } catch(error) {
    console.error("Erreur lors de la récupération des données : ", error);
    errorMessage.value = "Impossible de charger les classements pour le moment.";
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchRanking);
</script>

<template>
  <div class="leaderboard-page">
    <SideBar />
    <main>
      <h1>Classement général</h1>
      <div v-if="isLoading">Chargement en cours...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div v-else class="leaderboard-list">
        <div v-for="(team, index) in teams" :key="team.team" class="leaderboard-item">
          <span class="rank">{{ index + 1 }}.</span>
          <span class="team-name">{{ team.team }}</span>
          <span class="points">{{ team.points }} pts</span>
        </div>
      </div>
    </main>
  </div>
</template>


<style>
.leaderboard-page {
  display: flex;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #121212;
  color: #e0e0e0;
}

main h1 {
  color: #ffffff;
  text-align: center;
}

.leaderboard-list {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.leaderboard-item:hover {
  background-color: #007bff;
  color: #ffffff;
}

.rank {
  font-size: 18px;
  font-weight: bold;
  color: #ffd700;
  margin-right: 10px;
}

.team-name {
  flex: 2;
  font-size: 16px;
  color: #ffffff;
}

.points {
  flex: 1;
  text-align: right;
  font-size: 16px;
  color: #b0b0b0;
}
</style>