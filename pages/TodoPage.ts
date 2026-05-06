import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly todoInput: Locator;
    readonly todoList: Locator;
    readonly footer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = page.getByPlaceholder('What needs to be done?');
        this.todoList = page.locator('.todo-list');
        this.footer = page.locator('.footer');
    }

    async addTodoItem(text: string) {
        await this.todoInput.fill(text);
        await this.page.keyboard.press('Enter');
    }

    async assertTodoVisibleAndCounter(todoItem: string, itemCount: string, expectedTodoCount: number) {
        await expect(this.todoItems().filter({ hasText: todoItem })).toBeVisible();
        await expect(this.footer.getByText(itemCount)).toBeVisible();
        await expect(this.todoItems()).toHaveCount(expectedTodoCount);
    }

    async completeTodoItem(todoItem: string) {
        const todo = this.todoItems()
            .filter({ hasText: todoItem });
        await todo
            .getByLabel('Toggle Todo')
            .setChecked(true);
        await expect(todo).toHaveClass(/completed/);

    }

    todoItems() {
        return this.todoList.getByRole('listitem');
    }
}