import { expect, test, vi, describe, beforeEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Component from '@/components/PluginCard.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { useRoute, useRouter } from 'vue-router'
import * as matchers from '@testing-library/jest-dom/matchers'
import { RouterLinkStub } from '@vue/test-utils'
import { PLUGIN_STATES } from '@/shared/constants'

expect.extend(matchers)

vi.mock('vue-router')

const plugin = plugins.data.plugins['plugin1']

describe('PluginCard', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })

  useRoute.mockReturnValue({
    params: {
      tab: 'tab1'
    }
  })

  beforeEach(() => {
    useRouter().push.mockReset()
  })

  test('Renders title and description', () => {
    const { getByText } = renderComponent()

    expect(getByText(plugin.title)).toBeInTheDocument()
    expect(getByText(plugin.description)).toBeInTheDocument()
  })

  test('Plugin is enabled if state is active', async () => {
    const { getByText } = renderComponent()

    expect(getByText('Allowed')).toBeInTheDocument()
  })

  test('Can block plugin', async () => {
    const { getByRole, getByText } = renderComponent()

    const toggle = getByRole('checkbox')

    await fireEvent.click(toggle)

    expect(getByText('Blocked')).toBeInTheDocument()
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
    },
    props: {
      disabled: false,
      id: 'plugin1',
      state: PLUGIN_STATES.ACTIVE,
      plugin
    }
  })
