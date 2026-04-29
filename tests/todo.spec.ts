import { test, expect, Page } from '@playwright/test';

test('adds todo items and updates counter', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await addTodoItem(page, 'Learn Playwright');
  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '1 item left');

  await addTodoItem(page, 'Become Expert');
  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '2 items left');
  await assertTodoVisibleAndCounter(page, 'Become Expert', '2 items left');
});

test('marks todo item as completed', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await addTodoItem(page, 'Learn Playwright');
  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '1 item left');

  await completeTodoItem(page, 'Learn Playwright');

  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '0 items left');
});

async function addTodoItem(page: Page, text: string) {
  await page
    .getByPlaceholder('What needs to be done?')
    .fill(text);
  await page.keyboard.press('Enter');
}

async function assertTodoVisibleAndCounter(page: Page, todoItem: string, itemCount: string) {
  await expect(page.getByText(todoItem)).toBeVisible();
  await expect(page.getByText(itemCount)).toBeVisible();
}

async function completeTodoItem(page: Page, todoItem: string) {
  const todo = page
    .getByRole('listitem')
    .filter({ hasText: todoItem });
  await todo
    .getByLabel('Toggle Todo')
    .setChecked(true);
  await expect(todo).toHaveClass(/completed/);
}