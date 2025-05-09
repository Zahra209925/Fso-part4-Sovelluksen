const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app'); // Your Express app
const Blog = require('../models/blog'); // Your Blog model


const api = supertest(app);

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Author One',
    url: 'http://example.com/1',
    likes: 5,
  },
  {
    title: 'Second Blog',
    author: 'Author Two',
    url: 'http://example.com/2',
    likes: 10,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as JSON and correct number of blogs is returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs');
  const blogToDelete = blogsAtStart.body[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await api.get('/api/blogs');
  expect(blogsAtEnd.body).toHaveLength(initialBlogs.length - 1);

  const ids = blogsAtEnd.body.map(blog => blog.id);
     expect(ids).not.toContain(blogToDelete.id);


  const titles = blogsAtEnd.body.map(r => r.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('a blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs');
  const blogToUpdate = blogsAtStart.body[0];

  const updatedLikes = blogToUpdate.likes + 1;

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: updatedLikes })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const responseBody = response.body;
  expect(responseBody.likes).toBe(blogToUpdate.likes + 1);
});


afterAll(async () => {
  await mongoose.connection.close();
});
