import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('../../services/api/adminRequests.js', () => ({
  checkAdminRequestEligibility: vi.fn(() => Promise.resolve({ is_allowed: true })),
  createAdminRequest: vi.fn(() => Promise.resolve()),
  getMyAdminRequests: vi.fn(() => Promise.resolve([])),
}))

vi.mock('../../services/api/overageCreditGrant.js', () => ({
  invalidateOverageCreditGrantCache: vi.fn(() => {}),
}))

vi.mock('../../services/api/usage.js', () => ({
  fetchUtilization: vi.fn(() => Promise.resolve({ extra_usage: { is_enabled: true, monthly_limit: 100 } })),
}))

vi.mock('../../utils/auth.js', () => ({
  getSubscriptionType: vi.fn(() => 'pro'),
}))

vi.mock('../../utils/billing.js', () => ({
  hasClaudeAiBillingAccess: vi.fn(() => true),
}))

vi.mock('../../utils/config.js', () => ({
  getGlobalConfig: vi.fn(() => ({ hasVisitedExtraUsage: false })),
  saveGlobalConfig: vi.fn(() => {}),
}))

vi.mock('../../utils/log.js', () => ({
  logError: vi.fn(),
}))

vi.mock('../../utils/browser.js', () => ({
  openBrowser: vi.fn(),
}))

// Import after mocking
import { runExtraUsage } from './extra-usage-core.js'
import { openBrowser } from '../../utils/browser.js'
import { logError } from '../../utils/log.js'

describe('runExtraUsage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return error message when openBrowser throws an error', async () => {
    // Arrange
    const error = new Error('Browser failed to open')
    vi.mocked(openBrowser).mockRejectedValueOnce(error)

    // Act
    const result = await runExtraUsage()

    // Assert
    expect(openBrowser).toHaveBeenCalledWith('https://claude.ai/settings/usage')
    expect(logError).toHaveBeenCalledWith(error)
    expect(result).toEqual({
      type: 'message',
      value: 'Failed to open browser. Please visit https://claude.ai/settings/usage to manage extra usage.',
    })
  })
})
