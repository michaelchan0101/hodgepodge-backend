import data from './data'
import { sequelize, Category, Article } from '@/models'
async function truncateModel() {
  const models = [Category, Article]
  for (const model of models) {
    await model.destroy({ where: {}, force: true })
  }
}
async function resetAllIds() {
  try {
    await Promise.all([
      sequelize.query(`ALTER TABLE categories AUTO_INCREMENT = 1;`),
      sequelize.query(`ALTER TABLE articles AUTO_INCREMENT = 1;`),
    ])
  } catch (error) {
    console.log(`reset auto incerment errors: ${error}`)
  }
}
export default {
  resetAllIds,
  truncateModel,
  async reloadFixtures() {
    await truncateModel()
    const returnData = {}
    if (data.categories) {
      returnData['categories'] = await Category.bulkCreate(data.categories)
    }
    if (data.atricles) {
      returnData['atricles'] = await Article.bulkCreate(data.atricles)
    }
    return returnData
  },
}
