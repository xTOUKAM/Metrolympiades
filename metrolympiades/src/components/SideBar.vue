<script setup>
import 'material-design-icons/iconfont/material-icons.css';
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const menuItems = ref([
  { label: "Classement général", route: "/leaderboard" },
  { label: "Mon équipe", route: "/team" },
  { label: "Mes matchs", route: "/matches" },
  { label: "Se déconnecter", route: "/logout" },
]);

const isSidebarVisible = ref(true);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

const navigate = (route) => {
  router.push(route);
};
</script>

<template>
  <div class="layout">
    <button class="toggle-button" @click="toggleSidebar">
      <span class="material-icons">
        {{ isSidebarVisible ? "chevron_left" : "menu" }}
      </span>
    </button>
    <div class="sidebar" :class="{ hidden: !isSidebarVisible }">
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

.toggle-button {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 100%;
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

.sidebar {
  background-color: #121212;
  padding: 20px;
  width: 220px;
  height: 100vh;
  color: #e0e0e0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  margin-top: 50px;
  top: 0;
  left: 0;
  transition: transform 0.3s ease;
}

.sidebar.hidden {
  transform: translateX(-100%);
}

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
