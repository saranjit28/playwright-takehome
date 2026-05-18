import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test.describe('TodoMVC Application Tests', () => {

    test('Verify user can manage todo items successfully', async ({ page }) => {

        const todoPage = new TodoPage(page);

        // Open application
        await todoPage.navigateToApplication();

        // Add first todo
        await todoPage.addTodo('Learn Playwright');

        // Verify first todo
        await todoPage.verifyTodoPresent('Learn Playwright');

        // Add second todo
        await todoPage.addTodo('Write tests');

        // Verify total count
        await todoPage.verifyTodoCount(2);

        // Mark first todo completed
        await todoPage.markFirstTodoCompleted();

        // Verify completed filter
        await todoPage.clickCompletedFilter();

        await todoPage.verifyTodoPresent('Learn Playwright');

        // Verify active filter
        await todoPage.clickActiveFilter();

        await todoPage.verifyTodoPresent('Write tests');

        await todoPage.verifyTodoCount(1);

        // Optional step
        // await todoPage.clearCompletedItems();
    });
});