import '../utils/modulesAlias'
import fs from 'fs'
import path from 'path'
import categoryService from 'services/category.service'
import articleService from 'services/article.service'
// import showdown from 'showdown'

const FILE_PATH = path.join(__dirname, '../../../', 'articles')
async function getFiles() {
  const categories = fs.readdirSync(FILE_PATH)
  const articles = []
  categories.forEach(category => {
    const categoryPath = path.join(FILE_PATH, category)
    fs.readdirSync(categoryPath).forEach(filePath => {
      articles.push({
        categoryName: category,
        title: filePath.replace('.md', ''),
        path: path.join(categoryPath, filePath),
      })
    })
  })
  return { categories, articles }
}
async function handler() {
  console.time('loading articles')
  const { categories, articles } = await getFiles()
  const categoryObj = await categoryService.batchCreateCategories(categories)
  await articleService.batchImportArticles(
    articles.map(article => ({
      categoryId: categoryObj[article.categoryName].id,
      title: article.title,
      path: article.path,
    }))
  )
  console.timeEnd('loading articles')
}
handler()
