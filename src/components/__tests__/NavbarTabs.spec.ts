import { expect, test, describe } from 'vitest'
import { render } from '@testing-library/vue'
import Component from '@/components/NavbarTabs.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { RouterLinkStub } from '@vue/test-utils'

describe('NavbarTabs', () => {
  test('Renders tabs', async () => {
    const { getByText } = renderComponent()

    for (const tab of plugins.data.tabs) {
      expect(getByText(plugins.data.tabdata[tab].title)).toBeInTheDocument()
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
