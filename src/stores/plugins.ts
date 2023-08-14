import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { PluginsResponse, Tabdata } from '@/models/plugins'

const API_URL = 'https://run.mocky.io/v3'

export const usePluginsStore = defineStore('plugins', () => {
  const plugins = ref<AxiosResponse<PluginsResponse>>()

  const changeAllPluginsStatus = (newStatus: boolean): void => {
    for (const tab of plugins.value!.data.tabs) {
      const tabData = plugins.value!.data.tabdata[tab]

      if (newStatus) {
        tabData.disabled = []
      } else {
        tabData.disabled = [...tabData.disabled, ...tabData.active, ...tabData.inactive]
      }
    }
  }

  const getTabData = (tab: string): Tabdata => {
    return plugins.value!.data.tabdata[tab]
  }

  const getPlugins = (): Promise<void> => {
    return axios
      .get(`${API_URL}/25ac9d2f-1925-4c6b-8224-a8627573b654`)
      .then((res) => {
        if (res.data.errors) {
          alert('There was an error getting the data from the server')

          return
        }

        addStatusToDisabledPlugins(res.data.data)

        plugins.value = res.data
      })
      .catch(() => {
        alert('There was an error getting the data from the server')
      })
  }

  const changePluginStatus = (id: string, newStatus: boolean, tab: string): Promise<void> => {
    return axios
      .post(`${API_URL}/f3eb91da-0214-4196-a9b2-6d31c8a94056`, { id, newStatus })
      .then((res) => {
        if (res.data.errors) {
          alert('There was an error trying to modify your plugin')
          return
        }

        const tabData = plugins.value?.data.tabdata[tab]
        const newStatusArrayName = newStatus ? 'active' : 'inactive'
        const oldStatusArrayName = newStatus ? 'inactive' : 'active'

        // Find and delete item from old array
        const index = tabData![oldStatusArrayName].indexOf(id)
        tabData![oldStatusArrayName].splice(index, 1)

        // Add element in new array
        tabData![newStatusArrayName].push(id)
      })
      .catch(() => {
        alert('There was an error trying to modify your plugin')
      })
  }

  return { changePluginStatus, getPlugins, getTabData, plugins, changeAllPluginsStatus }
})

const addStatusToDisabledPlugins = (data: any): void => {
  for (const tab of data.tabs) {
    const tabData = data.tabdata[tab]
    tabData.active = [...tabData.active, ...tabData.disabled]
  }

  return data
}
