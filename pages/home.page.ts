import { Page, Locator, expect } from "@playwright/test";

class HomePage {
    page: Page;
    homePageImageLocator: any;
    formsBtn: Locator;

    constructor(page) {
        this.page = page;
        this.homePageImageLocator = '#app > header > a > img'
        this.formsBtn = page.locator('h5:has-text("Forms")')
    }

    async navigate() {
        console.log(`Home Page tests started at ${new Date()}`)

        await this.page.goto('/');
        const homePageCheck: boolean = await this.page.isVisible(this.homePageImageLocator);

        if (homePageCheck) {
            console.log('Home page has loaded');
        } else {
            console.error('Home page has not loaded');
            process.exit(1);
        }

        await expect(this.page).toHaveTitle('DEMOQA')
        console.log('Verified the home page has opened successfully')
    }

    async navigateToFormsPage() {

        await this.formsBtn.click();
        console.log('Clicked on the forms field successfully and navigating to the forms page.')

        await expect(this.page).toHaveURL(/.*forms/)
        console.log('Navigated to the forms page successfully.')
    }
}


export default HomePage