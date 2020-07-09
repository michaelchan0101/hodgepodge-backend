import { Article } from '..'

describe('Article Model', () => {
  test('create article success', async () => {
    const exampleData = {
      title: 'category 1',
      content: '<div>1</div>',
      categoryId: 1,
    }

    const result = await Article.create(exampleData)
    expect(result.title).toEqual(exampleData.title)
    expect(result.content).toEqual(exampleData.content)
    expect(result.categoryId).toEqual(exampleData.categoryId)
  })
})
