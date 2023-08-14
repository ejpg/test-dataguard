<template>
  <div class="container" v-if="pluginsStore.plugins">
    <NavbarMenu />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarMenu from './components/NavbarMenu.vue'
import { usePluginsStore } from '@/stores/plugins'

const pluginsStore = usePluginsStore()

pluginsStore.getPlugins()
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
</style>
