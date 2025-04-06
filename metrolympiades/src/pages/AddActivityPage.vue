<script setup>
import SideBar from "@/components/SideBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "@/utils";

const router = useRouter();
const newActivityName = ref("");
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

const addActivity = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      throw new Error("Utilisateur non authentifié. Veuillez vous connecter.");
    }

    // Envoie des données pour créer une activité
    const data = await fetchData("http://localhost:3000/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newActivityName.value }),
    });

    alert(`Activité "${data.name}" ajoutée avec succès !`);
    newActivityName.value = "";
  } catch (error) {
    errorMessage.value = `Erreur : ${error.message}`;
  }
};

checkAuthentication();
</script>

<template>
  <div class="activities-creation-page">
    <SideBar />
    <main>
      <h1>Créer une activité</h1>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="addActivity" class="add-activity-form">
        <div class="form-group">
          <label for="activityName">Nom de l'activité</label>
          <input
            id="activityName"
            v-model="newActivityName"
            type="text"
            placeholder="Nom de l'activité"
            required
          />
        </div>
        <button class="submit-button" type="submit">Ajouter l'activité</button>
      </form>
    </main>
  </div>
</template>