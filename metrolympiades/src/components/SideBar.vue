<script setup>
import 'material-design-icons/iconfont/material-icons.css';
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(false);
const teamName = ref("");

const menuItems = ref([]);
const isSidebarVisible = ref(true);

onMounted(() => {
  const token = localStorage.getItem("user");
  isLoggedIn.value == token;

  if(localStorage.getItem("user") !== null) {
    menuItems.value = [
      { label: "Classement général", route: "/leaderboard" },
      { label: "Mon équipe", route: "/team" },
      { label: "Mes matchs", route: "/matches" },
      { label: "Se déconnecter", route: "/logout" },
    ];
  } else {
    menuItems.value = [
      { label: "Classement général", route: "/leaderboard" },
      { label: "Se connecter", route: "/login" },
    ]
  }
  teamName.value = localStorage.getItem("teamName") || "Nom introuvable";
});

// Fonction pour basculer l'affichage de la sidebar
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

// Fonction pour naviguer vers les différentes routes
const navigate = (route) => {
  if (route === "/logout") {
    localStorage.clear();
    router.push("/");
  } else {
    router.push(route);
  }
};
</script>

<template>
  <div class="layout">
    <!-- Bouton pour afficher/masquer la sidebar -->
    <button class="toggle-button" @click="toggleSidebar">
      <span class="material-icons">
        {{ isSidebarVisible ? "chevron_left" : "menu" }}
      </span>
    </button>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ hidden: !isSidebarVisible }">
      <!-- Affichage du nom de l'équipe -->
      <h2 class="team-name-display">{{ teamName }}</h2>

      <!-- Menu des liens -->
      <ul>
        <li v-for="item in menuItems" :key="item.route" @click="navigate(item.route)">
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.layout {
  display: flex;
}

/* Bouton toggle pour la sidebar */
.toggle-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 1000;
}

.toggle-button:hover {
  background-color: #0056b3;
}

.toggle-button .material-icons {
  font-size: 18px;
}

/* Sidebar */
.sidebar {
  background-color: #121212;
  width: 220px;
  height: 100vh;
  color: #e0e0e0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}

.sidebar.hidden {
  transform: translateX(-100%);
}

/* Nom de l'équipe */
.team-name-display {
  margin-top: 100px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
}

/* Liste des liens */
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
}

.sidebar li:hover {
  background-color: #007bff;
  color: #ffffff;
}

/* Contenu principal */
main {
  flex: 1;
  padding: 20px;
  margin-left: 220px;
  background-color: #121212;
  color: #e0e0e0;
  transition: margin-left 0.3s ease;
}

.sidebar.hidden + main {
  margin-left: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 180px;
  }

  main {
    margin-left: 180px;
  }
}
</style>