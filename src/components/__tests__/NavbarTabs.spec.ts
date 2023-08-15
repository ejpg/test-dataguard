import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/vue'
import Component from '@/components/NavbarTabs.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { RouterLinkStub } from '@vue/test-utils'
import '@testing-library/jest-dom'
import type { PluginsResponse } from '@/models/plugins'

const pluginsData = plugins.data as PluginsResponse

describe('NavbarTabs', () => {
  test('Renders tabs', async () => {
    const { getByText } = renderComponent()

    for (const tab of pluginsData.tabs) {
      expect(getByText(pluginsData.tabdata[tab].title)).toBeInTheDocument()
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
          }
        })
      ],
      stubs: {
        RouterLink: RouterLinkStub
      }
    }
  })
