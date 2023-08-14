<template>
  <div class="plugins" v-if="tabData">
    <h2 class="plugins__title">{{ tabData.title }} Plugins</h2>

    <div class="plugins__list">
      <PluginCard
        v-for="(plugin, key) in plugins"
        :key="getId(key)"
        :id="getId(key)"
        :plugin="plugin"
        :state="getPluginState(key as string)"
        :disabled="isPluginDisabled(key as string)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PluginCard from '@/components/PluginCard.vue'
import { useRoute } from 'vue-router'
import { usePluginsStore } from '@/stores/plugins'
import { computed, type ComputedRef } from 'vue'
import { PLUGIN_STATES } from '@/shared/constants'
import type { Plugin } from '@/models/plugins'

const route = useRoute()
const pluginsStore = usePluginsStore()

const tabData = computed(() => pluginsStore.getTabData(route.params.tab as string))

const plugins: ComputedRef<{ [key: string]: Plugin }> = computed(() => {
  const result: { [key: string]: Plugin } = {}
  // If the array is not sorted it will change the order when the status are changed-
  const pluginsKeys = [...tabData.value.active, ...tabData.value.inactive].sort()

  for (const pluginKey of pluginsKeys) {
    result[pluginKey] = pluginsStore.plugins!.data.plugins[pluginKey]
  }

  return result
})

const getId = (key: string | number) => {
  return key as string
}

const isPluginDisabled = (pluginKey: string): boolean => {
  return tabData.value!.disabled.includes(pluginKey)
}

const getPluginState = (pluginKey: string): string => {
  let state = ''

  if (tabData.value!.active.includes(pluginKey)) {
    state = PLUGIN_STATES.ACTIVE
  } else if (tabData.value!.inactive.includes(pluginKey)) {
    state = PLUGIN_STATES.INACTIVE
  }

  return state
}
</script>

<style lang="scss" scoped>
.plugins {
  margin: 2.5rem;

  &__list {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__title {
    margin-bottom: 2rem;
  }
}
</style>
