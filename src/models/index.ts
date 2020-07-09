import sequelize from '../drivers/sequelize'
import { Category, initCategory, associateCategory } from './Category'
import { Article, initArticle, associateArticle } from './Article'

// init model
;[initCategory, initArticle].forEach(initFunc => initFunc(sequelize))

// associate model
;[associateCategory, associateArticle].forEach(associateFunc => associateFunc())

export { sequelize, Category, Article }
