import { encryptPassword } from '@/utils'
import randomstring from 'randomstring'

const passwordSalt1 = randomstring.generate(32)
const passwordSalt2 = randomstring.generate(32)
export default {
  admins: [
    {
      id: 1,
      username: 'user1',
      password: encryptPassword('123456', passwordSalt1),
      passwordSalt: passwordSalt1,
    },
    {
      id: 2,
      username: 'user2',
      password: encryptPassword('234567', passwordSalt2),
      passwordSalt: passwordSalt2,
    },
  ],
  categories: [
    {
      id: 1,
      name: 'category 1',
    },
    {
      id: 2,
      name: 'category 2',
    },
    {
      id: 3,
      name: 'category 3',
    },
    {
      id: 4,
      name: 'category 4',
    },
    {
      id: 5,
      name: 'category 5',
    },
  ],
  atricles: [
    {
      id: 1,
      categoryId: 1,
      title: 'atricle 1',
      content: '<div>content 1</div>',
      originalContent: '#content 1',
    },
    {
      id: 2,
      categoryId: 1,
      title: 'atricle 2',
      content: '<div>content 2</div>',
      originalContent: '#content 2',
    },
    {
      id: 3,
      categoryId: 1,
      title: 'atricle 3',
      content: '<div>content 3</div>',
      originalContent: '#content 3',
    },
    {
      id: 4,
      categoryId: 2,
      title: 'atricle 4',
      content: '<div>content 4</div>',
      originalContent: '#content 4',
    },
    {
      id: 5,
      categoryId: 2,
      title: 'atricle 5',
      content: '<div>content 5</div>',
      originalContent: '#content 5',
    },
    {
      id: 6,
      categoryId: 3,
      title: 'atricle 6',
      content: '<div>content 6</div>',
      originalContent: '#content 6',
    },
  ],
}
