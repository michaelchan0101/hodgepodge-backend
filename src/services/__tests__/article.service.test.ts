import articleService from 'services/article.service'
import fixtures from 'tests/fixtures'
import marked from 'marked'

describe('articleService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })
  describe('listArticles', () => {
    test('should successfully', async () => {
      const results = await articleService.listArticles()
      expect(results.articles).toHaveLength(6)
      expect(results.articles[0].id).toEqual(6)
      expect(results.articles[0].category.id).toEqual(3)
      expect(results.limit).toEqual(20)
      expect(results.offset).toEqual(0)
    })

    test('should successfully/ limit = 2, offset = 2', async () => {
      const results = await articleService.listArticles({}, 2, 2)
      expect(results.articles).toHaveLength(2)
      expect(results.articles[0].id).toEqual(4)
      expect(results.articles[0].category.id).toEqual(2)
      expect(results.limit).toEqual(2)
      expect(results.offset).toEqual(2)
    })
  })

  test('should get one article successfully', async () => {
    const article = await articleService.getArticle(1)
    expect(article.id).toEqual(1)
    expect(article.category.id).toEqual(1)
    expect(article.originalContent).toBeUndefined()
    expect(article.content).not.toBeUndefined()
  })

  test('should create article successfully', async () => {
    const data = {
      categoryId: 1,
      title: 'test-1001',
      content: '#Test\n\nRendered by **marked**.',
    }
    const article = await articleService.adminCreateArticle(data)
    expect(article.categoryId).toEqual(data.categoryId)
    expect(article.title).toEqual(data.title)
    expect(article.originalContent).toEqual(data.content)
    expect(article.content).toEqual(marked(data.content))
  })

  test('should update article successfully', async () => {
    const data = {
      categoryId: 1,
      title: 'test-1',
      content: '#Test\n\nRendered by **marked**.',
    }
    const article = await articleService.adminUpdateArticle(1, data)
    expect(article.id).toEqual(1)
    expect(article.categoryId).toEqual(data.categoryId)
    expect(article.title).toEqual(data.title)
    expect(article.originalContent).toEqual(data.content)
    expect(article.content).toEqual(marked(data.content))
  })
})
