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

afterAll(async () => {
  await mongoose.connection.close();
});

