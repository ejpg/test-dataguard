<template>
  <nav>
    <RouterLink class="navbar-tab" v-for="(tab, key) in tabs" :key="key" :to="`/${key}`">
      <img alt="Vue logo" class="navbar-tab-icon" :src="getImageUrl(tab.icon)" />
      {{ tab.title }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePluginsStore } from '@/stores/plugins'
import { computed } from 'vue'

const pluginsStore = usePluginsStore()

const tabs = computed(() => pluginsStore.plugins!.data.tabdata)

const getImageUrl = (tabIcon: string): string =>
  new URL(`/src/assets/img/${tabIcon}.svg`, import.meta.url).href
</script>

<style lang="scss">
@import '@/assets/scss/colors';

.navbar-tab {
  width: 100%;
  background: transparent;
  border: none;
  border-left: solid transparent 0.75rem;
  padding: 1rem;
  text-align: left;
  font-size: 1.2rem;
  display: flex;
  color: $black;
  text-decoration: none;

  &:hover {
    background: $white;
  }

  &.router-link-exact-active {
    background: $white;
    border-left-color: $tab-active;
  }

  &-icon {
    height: 1.8rem;
    margin-right: 0.7rem;
  }
}
</style>
