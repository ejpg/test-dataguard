import { expect, test, describe } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Component from '@/components/NavbarMenu.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import '@testing-library/jest-dom'

describe('NavbarMenu', () => {
  test('Toggle inits as enabled', async () => {
    const { getByText } = renderComponent()

    expect(getByText('All plugins enabled')).toBeInTheDocument()
  })

  test('Can disable plugins', async () => {
    const { getByRole, getByText } = renderComponent()

    const toggle = getByRole('checkbox')

    await fireEvent.click(toggle)

    expect(getByText('All plugins disabled')).toBeInTheDocument()
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
        'router-link': { template: '<a/>' }
      }
    }
  })
