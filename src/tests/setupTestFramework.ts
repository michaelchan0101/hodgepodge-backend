require('tsconfig-paths/register')
import fixtures from 'tests/fixtures'
import { sequelize } from 'models'
// async function createFixtures() {
//   await fixtures.reloadFixtures()
// }

async function clearFixtures() {
  // WARN: Be careful the sorting - redis must be in front of coupon
  await fixtures.truncateModel()
  await fixtures.resetAllIds()
}

async function turnOffAllConnections() {
  await Promise.all([sequelize.close()])
}

/**
 * Framework setup and teardown functions
 *
 * These functions are run on every test suite invocation, as if `global` is a
 * scope wrapping each test suite.
 *
 * `require`s inside these functions **are run in the context of the test suite**,
 * so there is a difference `require`-ing  inside and outside (globally) the
 * functions. Take note that modules `require`d outside the functions **are not**
 * affected by mocks set up inside a test suite, so something un-mocked may be
 * leaked to the test suite expecting a mocked function/object.
 */

beforeAll(async () => {
  // The temperate solution for resolving the CI testcase timeout error
  // for some controllers that costs huge time
  //
  // The only way is to optimize the whole test framework!
  jest.setTimeout(180 * 1000) // 3 mins
  await clearFixtures()
  // if (global.cleanData) {
  //   await clearFixtures()
  // }
  // if (global.loadFixtures) {
  //   await createFixtures()
  // }
  // if (global.usedJestResetModules) {
  //   await turnOffAllConnections()
  // }
})

afterAll(async () => {
  await clearFixtures()
  await turnOffAllConnections()
})
