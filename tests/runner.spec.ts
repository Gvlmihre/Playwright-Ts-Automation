import { test } from '@playwright/test';
import FormsPage from '../pages/forms.page'
import HomePage from '../pages/home.page';
import { faker } from '@faker-js/faker'

test.describe('Demoqa Automation Tests', () => {
    let formsPage: FormsPage
    let homePage: HomePage

    test('Open the website, fill in the form, submit and take screenshot test ', async ({ page }) => {
        formsPage = new FormsPage(page);
        homePage = new HomePage(page);

        await homePage.navigate()
        await homePage.navigateToFormsPage()
        await formsPage.submitPracticeForm(faker.person.firstName(), faker.person.lastName(), faker.internet.email(),
            faker.phone.number('0090######'), faker.location.streetAddress());
        await formsPage.takeElementScreenShot('div.modal-content')
    })
})