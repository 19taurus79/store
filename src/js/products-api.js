// Функції для роботи з бекендом

import axios from 'axios';
// Добавляємо базовий URL для всіх запитів
axios.defaults.baseURL = 'https://dummyjson.com/products';
// Функція для отримання категорій
export async function getCategories() {
  const { data } = await axios.get('/category-list');
  return data;
}
// Функція для отримання продуктів за категорією
// Використовується пагінація для отримання 12 продуктів за раз
export async function getProductsByCategory(category, page = 1) {
  const { data } = await axios.get(
    `/category/${category}?limit=12&skip=${(page - 1) * 12}`
  );
  return data;
}
// Функція для отримання всіх продуктів
// Використовується пагінація для отримання 12 продуктів за раз
export async function getProducts(page = 1) {
  const { data } = await axios.get(`?limit=12&skip=${(page - 1) * 12}`);
  return data;
}
// Функція для отримання продукту за ID
// Використовується пагінація для отримання 12 продуктів за раз
export async function getProductById(id) {
  const { data } = await axios.get(`/${id}`);
  return data;
}
// Функція для отримання продуктів за запитом
// Використовується пагінація для отримання 12 продуктів за раз
export async function getProductsByQuery(query, page = 1) {
  const { data } = await axios.get(
    `/search?q=${query}&limit=12&skip=${(page - 1) * 12}`
  );
  return data;
}
