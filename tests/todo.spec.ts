import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/todomvc');
});

test('adds todo items and updates counter', async ({ page }) => {
  await addTodoItem(page, 'Learn Playwright');
  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '1 item left', 1);

  await addTodoItem(page, 'Become Expert');
  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '2 items left', 2);
  await assertTodoVisibleAndCounter(page, 'Become Expert', '2 items left', 2);
  
});

test('marks todo item as completed', async ({ page }) => {
  await addTodoItem(page, 'Learn Playwright');
  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '1 item left', 1);

  await completeTodoItem(page, 'Learn Playwright');

  await assertTodoVisibleAndCounter(page, 'Learn Playwright', '0 items left', 1);
});

async function addTodoItem(page: Page, text: string) {
  await page
    .getByPlaceholder('What needs to be done?')
    .fill(text);
  await page.keyboard.press('Enter');
}

async function assertTodoVisibleAndCounter(page: Page, todoItem: string, itemCount: string, expectedTodoCount: number) {
  await expect(todoItems(page).filter({ hasText: todoItem })).toBeVisible();
  await expect(page.locator('.footer').getByText(itemCount)).toBeVisible();
  await expect(todoItems(page)).toHaveCount(expectedTodoCount);
}

async function completeTodoItem(page: Page, todoItem: string) {
  const todo = todoItems(page)
    .filter({ hasText: todoItem });
  await todo
    .getByLabel('Toggle Todo')
    .setChecked(true);
  await expect(todo).toHaveClass(/completed/);
}

function todoItems(page: Page) {
  return page.locator('.todo-list').getByRole('listitem');
}