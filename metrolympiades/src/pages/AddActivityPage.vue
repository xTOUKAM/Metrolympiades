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

<style>
.activities-creation-page {
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

.error-message {
  color: #ff4d4d;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
}

.add-activity-form {
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
  margin-top: 10px;
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