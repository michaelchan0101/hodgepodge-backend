import moduleAlias from 'module-alias'
import fs from 'fs'
import path from 'path'

function addModulesAlias() {
  const projectDir = path.join(__dirname, '..')
  const aliasDirs = fs.readdirSync(projectDir)
  const aliasMap = {
    '@': projectDir,
  }
  for (const aliasDir of aliasDirs) {
    if (!/.+\.(ts|js)/.test(aliasDir)) {
      aliasMap[aliasDir] = path.join(projectDir, aliasDir)
    }
  }
  moduleAlias.addAliases(aliasMap)
}
addModulesAlias()
