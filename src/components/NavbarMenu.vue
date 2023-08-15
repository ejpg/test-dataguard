<template>
  <div class="left-sidebar">
    <div class="left-sidebar__logo-wrapper">
      <img alt="Vue logo" class="left-sidebar__logo" src="@/assets/img/logo.svg" />
    </div>
    <NavbarTabs />
    <div
      class="left-sidebar__disable-button-wrapper"
      :class="`left-sidebar__disable-button-wrapper--${stateToggle ? 'enabled' : 'disabled'}`"
    >
      <h3>All plugins {{ pluginsStateLabel }}</h3>
      <ButtonToggle v-model="stateToggle" @input="toggleState" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavbarTabs from './NavbarTabs.vue'
import ButtonToggle from './ButtonToggle.vue'
import { computed, ref, type ComputedRef } from 'vue'
import { usePluginsStore } from '@/stores/plugins'

const pluginsStore = usePluginsStore()

const pluginsStateLabel: ComputedRef<string> = computed(() =>
  stateToggle.value ? 'enabled' : 'disabled'
)
const stateToggle = ref(true)

const toggleState = (event: Event): void => {
  pluginsStore
    .changeAllPluginsStatus((event.target as HTMLInputElement).checked)
    .then((response) => {
      if (response.error) stateToggle.value = !(event.target as HTMLInputElement).checked
    })
}
</script>

<style lang="scss">
@import '@/assets/scss/colors';

.left-sidebar {
  background-color: $navbar-background;
  min-width: 25rem;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__logo {
    width: 60%;
    &-wrapper {
      padding: 2.5rem;
    }
  }

  &__disable-button-wrapper {
    margin-top: auto; //FIX
    padding: 2.5rem;
    display: flex;
    justify-content: space-between;
    &--enabled {
      background: $enable-plugins-background;
      background: $enable-plugins-gradient;
    }
    &--disabled {
      background: $disable-plugins-background;
      background: $disable-plugins-gradient;
    }
  }
}
</style>
