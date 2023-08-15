<template>
  <div class="plugin" :class="{ 'plugin--disabled': disabled }">
    <div>
      <h3 class="plugin__title">{{ plugin.title }}</h3>
      <p class="plugin__description">
        {{ plugin.description }}
      </p>
    </div>
    <div class="plugin__toggle" :class="`plugin__toggle--${toggleState ? 'allowed' : 'blocked'}`">
      <ButtonToggle
        v-model="toggleState"
        class="plugin__toggle-button"
        :disabled="disabled"
        @input="changeToggleState"
      />
      {{ toggleLabel }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import ButtonToggle from './ButtonToggle.vue'
import { usePluginsStore } from '@/stores/plugins'
import { PLUGIN_STATES } from '@/shared/constants'
import { useRoute } from 'vue-router'

const props = defineProps({
  disabled: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    required: true
  },

  //FIX TYPE
  plugin: {
    type: Object,
    required: true
  },
  state: {
    type: String,
    required: true
  }
})

const route = useRoute()

const pluginsStore = usePluginsStore()

const toggleState = ref()

onBeforeMount(() => {
  toggleState.value = props.state === PLUGIN_STATES.ACTIVE
})

const toggleLabel = computed(() => {
  return toggleState.value ? 'Allowed' : 'Blocked'
})

const changeToggleState = (event: any): void => {
  //FIX PARAM TYPE
  pluginsStore
    .changePluginStatus(props.id, event.target.checked, route.params.tab as string)
    .then((response) => {
      if (response.error) toggleState.value = !event.target.checked
    })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/colors';

.plugin {
  display: flex;
  padding: 1.5rem;
  border: solid 2px $plugin-border;
  border-radius: 1rem;
  width: 20rem;

  &--disabled {
    opacity: 0.6;
  }

  &__title {
    margin-bottom: 2rem;
    font-size: 1.3rem;
  }

  &__description {
    color: $plugin-description;
  }

  &__toggle {
    font-size: 0.8rem;
    text-align: center;

    &--allowed {
      color: $toggle-green;
    }
    &--blocked {
      color: $toggle-red;
    }
    &-button {
      margin-bottom: 0.4rem;
    }
  }
}
</style>
