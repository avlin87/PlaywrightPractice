import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await page.goto('/todomvc');
});

test('adds todo items and updates counter', async () => {
  await todoPage.addTodoItem('Learn Playwright');
  await todoPage.assertTodoVisibleAndCounter('Learn Playwright', '1 item left', 1);

  await todoPage.addTodoItem('Become Expert');
  await todoPage.assertTodoVisibleAndCounter('Learn Playwright', '2 items left', 2);
  await todoPage.assertTodoVisibleAndCounter('Become Expert', '2 items left', 2);

});

test('marks todo item as completed', async () => {
  await todoPage.addTodoItem('Learn Playwright');
  await todoPage.assertTodoVisibleAndCounter('Learn Playwright', '1 item left', 1);

  await todoPage.completeTodoItem('Learn Playwright');

  await todoPage.assertTodoVisibleAndCounter('Learn Playwright', '0 items left', 1);
});