import { expect, test, describe } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Component from '@/components/PluginCard.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { RouterLinkStub } from '@vue/test-utils'
import '@testing-library/jest-dom'

const plugin = plugins.data.plugins['plugin1']

describe('PluginCard', () => {
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
          },
          stubActions: false
        })
      ],
      stubs: {
        RouterLink: RouterLinkStub
      }
    },
    props: {
      active: true,
      disabled: false,
      id: 'plugin1',
      plugin
    }
  })
