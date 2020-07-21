import sequelize from '../drivers/sequelize'
import { Category, initCategory, associateCategory } from './Category'
import { Article, initArticle, associateArticle } from './Article'
import { Admin, initAdmin } from './Admin'

// init model
;[initCategory, initArticle, initAdmin].forEach(initFunc => initFunc(sequelize))

// associate model
;[associateCategory, associateArticle].forEach(associateFunc => associateFunc())

export { sequelize, Category, Article, Admin }
