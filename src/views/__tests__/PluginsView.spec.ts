import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/vue'
import Component from '@/views/PluginsView.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { RouterLinkStub } from '@vue/test-utils'
import { usePluginsStore } from '@/stores/plugins'

const tab = 'tab1'
const tabData = plugins.data.tabdata[tab]

describe('PluginsView', () => {
  test('Renders title', () => {
    const { getByText } = renderComponent()

    usePluginsStore()

    expect(getByText(`${tabData.title} Plugins`)).toBeInTheDocument()
  })

  test('Shows tab plugins', () => {
    const { getByText } = renderComponent()

    for (const pluginId of [...tabData.active, ...tabData.inactive, ...tabData.disabled]) {
      const plugin = plugins.data.plugins[pluginId]
      expect(getByText(plugin.title)).toBeInTheDocument()
    }
  })

  test('Doesnt show other tabs plugins', () => {
    const { queryByText } = renderComponent()
    const financeTabData = plugins.data.tabdata['tab2']
    const personnelTabData = plugins.data.tabdata['tab3']

    for (const pluginId of [
      ...financeTabData.active,
      ...financeTabData.inactive,
      ...financeTabData.disabled
    ]) {
      const plugin = plugins.data.plugins[pluginId]
      expect(queryByText(plugin.title)).not.toBeInTheDocument()
    }

    for (const pluginId of [
      ...personnelTabData.active,
      ...personnelTabData.inactive,
      ...personnelTabData.disabled
    ]) {
      const plugin = plugins.data.plugins[pluginId]
      expect(queryByText(plugin.title)).not.toBeInTheDocument()
    }
  })
})

const renderComponent = () =>
  render(Component, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            plugins: { plugins }
          },
          stubActions: false
        })
      ],
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  })
