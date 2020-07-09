declare namespace NodeJS {
  interface Global {
    loadFixtures: boolean
    usedJestResetModules: boolean
    beforeAll(func: Function): void
    afterAll(func: Function): void
  }
}
