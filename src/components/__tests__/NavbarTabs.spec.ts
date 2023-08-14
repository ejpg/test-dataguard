import { expect, test, vi, describe, beforeEach } from 'vitest'
import { render } from '@testing-library/vue'
import Component from '@/components/NavbarTabs.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { useRouter } from 'vue-router'
import * as matchers from '@testing-library/jest-dom/matchers'
import { RouterLinkStub } from '@vue/test-utils'

expect.extend(matchers)

vi.mock('vue-router')

describe('NavbarTabs', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })

  beforeEach(() => {
    useRouter().push.mockReset()
  })

  test('Renders tabs', async () => {
    const { getByText, debug } = renderComponent()

    debug()

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
