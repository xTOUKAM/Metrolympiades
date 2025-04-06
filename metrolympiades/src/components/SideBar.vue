<script setup>
import 'material-design-icons/iconfont/material-icons.css';
import { ref } from "vue";
import { useAuth, useNavigation } from "@/utils";

const { isLoggedIn, teamName, checkAuth } = useAuth();
const { navigate } = useNavigation();
const menuItems = ref([]);
const isSidebarVisible = ref(true);

checkAuth();

if (isLoggedIn.value) {
  menuItems.value = [
    { label: "Classement général", route: "/leaderboard", icon: "poll" },
    { label: "Mon équipe", route: "/team", icon: "people" },
    { label: "Mes matchs", route: "/games", icon: "people" },
    { label: "Nouveau match", route: "/game", icon: "add_circle" },
    { label: "Ajouter une activité", route:"/add", icon: "event" },
    { label: "Se déconnecter", route: "/logout", icon: "exit_to_app" },
  ];
} else {
  menuItems.value = [
    { label: "Classement général", route: "/leaderboard", icon: "poll" },
    { label: "Se connecter", route: "/login", icon: "person" },
  ];
}

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const handleNavigation = (route) => {
  if (route === "/logout") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("teamName");
    window.location.href = "/";
  } else {
    window.location.href = route;
  }
};
import { onMounted } from "vue";
</script>

<template>
  <div class="layout">
    <!-- Bouton toggle pour la sidebar -->
    <button class="toggle-button" @click="toggleSidebar">
      <span class="material-icons">
        {{ isSidebarVisible ? "chevron_left" : "menu" }}
      </span>
    </button>

    <!-- Sidebar -->
    <div class="sidebar" :class="{ hidden: !isSidebarVisible }">
      <!-- Affichage du nom de l'équipe -->
      <h2 class="team-name-display">{{ teamName || "METRO"}}</h2>

      <!-- Menu des liens -->
      <ul>
        <li v-for="item in menuItems" :key="item.route" @click="handleNavigation(item.route)">
          <span class="icon"><span class="material-icons">{{ item.icon }}</span></span>
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

.toggle-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  transition: background-color 0.3s ease;
}

.toggle-button:hover {
  background-color: #0056b3;
}

.toggle-button .material-icons {
  font-size: 20px;
}

/* Sidebar */
.sidebar {
  background-color: #121212;
  width: 240px;
  height: 100vh;
  color: #e0e0e0;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  padding: 20px 0;
  overflow-y: auto;
}

.sidebar.hidden {
  transform: translateX(-100%);
  opacity: 0;
}

.team-name-display {
  margin-top: 7px;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 50px 0 0 0;
}

.sidebar li {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 8px;
  transition: background-color 0.2s ease, padding-left 0.2s ease;
  cursor: pointer;
  font-size: 16px;
}

.sidebar li:hover {
  background-color: #0056b3;
  padding-left: 30px;
}

.sidebar li span {
  font-weight: 400;
}

.sidebar li .icon {
  margin-right: 15px;
  color: #ffffff;
  font-size: 20px;
}

/* Contenu principal */
main {
  flex: 1;
  padding: 20px;
  margin-left: 240px;
  background-color: #121212;
  color: #e0e0e0;
  transition: margin-left 0.3s ease;
}

.sidebar.hidden + main {
  margin-left: 0;
}

@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }

  main {
    margin-left: 200px;
  }
}
</style>
