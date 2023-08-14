import { expect, test, vi, describe, beforeEach } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Component from '@/components/NavbarMenu.vue'
import { createTestingPinia } from '@pinia/testing'
import plugins from '../../../api/db.json'
import { useRouter } from 'vue-router'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

vi.mock('vue-router')

describe('NavbarMenu', () => {
  useRouter.mockReturnValue({
    push: vi.fn()
  })

  beforeEach(() => {
    useRouter().push.mockReset()
  })

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
          }
        })
      ],
      stubs: {
        'router-link': { template: '<a/>' }
      }
    }
  })
