<template>
  <div class="wrapper">
    <sidebar></sidebar>
    <div id="content">
      <header-app></header-app>
      <router-view />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import HeaderApp from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default {
  name: "App",
  components: {
    HeaderApp: HeaderApp,
    Sidebar: Sidebar
  }
};
</script>

<style>
</style>
