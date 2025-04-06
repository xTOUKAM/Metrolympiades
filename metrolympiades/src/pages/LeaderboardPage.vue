<script setup>
import SideBar from '@/components/SideBar.vue';
import { ref, onMounted } from "vue";
import { fetchData } from '@/utils';

const teams = ref([]);
const errorMessage = ref("");
const isLoading = ref(true);

const fetchRanking = async () => {
  try {
    const data = await fetchData("http://localhost:3000/ranking", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    teams.value = data;
  } catch (error) {
    errorMessage.value = `Erreur : ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

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