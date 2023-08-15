import { expect, vi } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
import { useRoute, useRouter } from 'vue-router'
import '@testing-library/jest-dom/extend-expect'

expect.extend(matchers)

vi.mock('vue-router')
;(useRouter as jest.Mock).mockReturnValue({
  push: vi.fn()
})
;(useRoute as jest.Mock).mockReturnValue({
  params: {
    tab: 'tab1'
  }
})
