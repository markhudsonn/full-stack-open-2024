const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require ('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = null
let userId = null

beforeEach(async () => {
  await User.deleteMany({})
  const response = await api
    .post('/api/users')
    .send({
      "username": "test",
      "name": "test",
      "password": "test"
    })
    .expect(201)
  userId = response.body.id
})

beforeEach(async () => {
  const response = await api
    .post('/api/login')
    .send({
      "username": "test",
      "password": "test"
    })
    .expect(200)
  token = response.body.token
})


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs(userId))
})


describe('when there is initially some blogs saved', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test("blogs have id property instead of _id", async () => {
    const response = await api
      .get("/api/blogs")
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const ids = response.body.map((blog) => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
  })
})

describe('adding a blog', () => {
  test('total number of blogs increases by 1 after adding one', async () => {
    newBlog = helper.blogToAdd
    const blogsAtStart = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

    const titles = blogsAtEnd.map(n=>n.title)
    expect(titles).toContain('Blog to add')
  })

  test('adding blog with no likes defaults to 0', async () => {
    newBlog = helper.blogWithoutLikes

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('adding blog with no title returns 400', async () => {
    newBlog = helper.blogWithNoTitle

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const likesAtStart = blogToUpdate.likes

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send({ likes:likesAtStart +1 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(updatedBlog.likes).toBe(likesAtStart + 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})