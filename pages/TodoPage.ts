import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {

    readonly page: Page;
    readonly todoInput: Locator;
    readonly todoItems: Locator;

    constructor(page: Page) {

        this.page = page;
        this.todoInput = page.getByPlaceholder('What needs to be done?');
        this.todoItems = page.locator('.todo-list li');
    }

    async navigateToApplication() {
        await this.page.goto('https://demo.playwright.dev/todomvc');
    }

    async addTodo(todoText: string) {
        await this.todoInput.fill(todoText);
        await this.todoInput.press('Enter');
    }

    async verifyTodoPresent(todoText: string) {
        await expect(this.todoItems).toContainText([todoText]);
    }

    async verifyTodoCount(count: number) {
        await expect(this.todoItems).toHaveCount(count);
    }

    async markFirstTodoCompleted() {
        await this.todoItems.first().locator('.toggle').check();
    }

    async clickCompletedFilter() {
        await this.page.getByRole('link', { name: 'Completed' }).click();
    }

    async clickActiveFilter() {
        await this.page.getByRole('link', { name: 'Active' }).click();
    }

    async clearCompletedItems() {
        await this.page.getByRole('button', { name: 'Clear completed' }).click();
    }
}