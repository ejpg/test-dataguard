import { expect, test, describe } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import Component from '@/components/ButtonToggle.vue'

describe('ButtonToggle', () => {
  test('emits value on click', async () => {
    const { emitted, getByRole } = render(Component)
    const button = getByRole('checkbox')

    await fireEvent.click(button)

    expect(emitted()['update:modelValue']).toHaveLength(1)
  })

  test('Is disabled when prop disabled is true', () => {
    const { getByRole } = render(Component, {
      props: {
        disabled: true
      }
    })
    const button = getByRole('checkbox')

    expect(button).toBeDisabled()
  })
})
