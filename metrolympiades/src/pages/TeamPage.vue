<script setup>
import { ref, onMounted } from 'vue';
import SideBar from '@/components/SideBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const teamName = ref("");
const teamMembers = ref([]);
const newMember = ref("");
const errorMessage = ref("");
const token = localStorage.getItem("authToken");


const fetchTeam = async () => {
  try {
    if (!token) {
      router.push("/login"); // Redirection si non connecté
      throw new Error("Vous ne pouvez pas accéder à cette page tant que vous n'êtes pas connecté.");
    }

    const response = await fetch("http://localhost:3000/teams/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      teamName.value = data.name;
      teamMembers.value = data.members || [];
    } else {
      const error = await response.json();
      if (error.message === "Invalid token") {
        localStorage.removeItem("authToken");
        router.push("/login");
        throw new Error("Le token est invalide ou expiré. Veuillez vous reconnecter.");
      }
      errorMessage.value = `Erreur : ${error.message}`;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    errorMessage.value = "Impossible de charger les données de l'équipe.";
  }
};

const addMember = () => {
    if(newMember.value.trim() !== "") {
        const newId = Date.now();
        teamMembers.value.push({id: newId, name: newMember.value.trim()});
        newMember.value = "";
    }
}

const removeMember = (memberId) => {
    teamMembers.value = teamMembers.value.filter((m) => m.id !== memberId);
}

const saveTeam = async () => {
  try {
    const response = await fetch("http://localhost:3000/teams/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: teamName.value,
        members: teamMembers.value,
      }),
    });

    if (response.ok) {
      alert("Équipe mise à jour avec succès !");
      localStorage.setItem("teamName", teamName.value);
    } else {
      const error = await response.json();
      alert(`Erreur : ${error.message}`);
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
    alert("Impossible de sauvegarder les modifications.");
  }
};

onMounted(fetchTeam);
</script>

<template>
    <div class="team-page">
        <SideBar />
            <main>
                <h1>Mon équipe : {{ teamName }}</h1>
                <div v-if="errorMessage">{{ errorMessage }}</div>
                <div v-else class="team-list">
                
                <label for="teamName">Nom de l'équipe</label>
                <input id="teamName" v-model="teamName" type="text" placeholder="Nom de l'équipe">
            
                <!-- Liste des membres -->
                <div v-for="(member, index) in teamMembers" :key="index" class="team-item">
                    <span class="team-name">{{ member.name }}</span>
                    <button class="icon-button remove-button" @click="removeMember(member.id)">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
  
                <!-- Ajouter un membre -->
                <div class="add-member">
                    <input
                        v-model="newMember"
                        type="text"
                        placeholder="Ajouter un coéquipier"
                    />
                    <button class="icon-button add-button" @click="addMember">
                        <span class="material-icons">add</span>
                    </button>
                </div>
  
                <!-- Bouton de sauvegarde -->
                <button class="save-button" @click="saveTeam">Enregistrer</button>
            </div>
        </main>
    </div>
</template>
  