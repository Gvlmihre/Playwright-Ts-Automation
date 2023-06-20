import { Locator, Page, expect } from "@playwright/test";

class FormsPage {
    page: Page;
    practiceFormBtn: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    emailField: Locator;
    genderBtn: Locator;
    mobileNumberField: Locator;
    dateOfBirthField: Locator;
    subjectField: Locator;
    hobbiesField: Locator;
    pictureField: Locator;
    address: Locator;
    stateField: Locator;
    cityField: Locator;
    submitBtn: Locator;
    closeBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.practiceFormBtn = page.locator('text=practice Form')
        this.firstNameField = page.locator('#firstName')
        this.lastNameField = page.locator('#lastName')
        this.emailField = page.locator('#userEmail')
        this.mobileNumberField = page.locator('#userNumber')
        this.hobbiesField = page.locator('#hobbies-checkbox-2')
        this.address = page.locator('#currentAddress')
        this.stateField = page.locator('#state')
        this.cityField = page.locator('#city')
        this.submitBtn = page.locator('#submit.btn.btn-primary')
        this.closeBtn = page.locator('button#closeLargeModal')
    }

    async submitPracticeForm(firstName: string, lastName: string, email: string,
        mobileNumber: string,
        address: string) {

        await this.practiceFormBtn.click()
        await this.page.evaluate(() => {
            document.body.style.transform = 'scale(0.5)'
        })

        console.log('Starting to fill the practice form:')


        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.page.locator('#gender-radio-2[value=\'Female\']').check({ force: true });
        await this.mobileNumberField.fill(mobileNumber);
        await this.address.fill(address);
        console.log('Practice Form Filled Successfully')

        await this.submitBtn.click({ force: true })
        console.log('Practice Form Submitted Successfully')

        await this.page.waitForTimeout(5000)
        console.log('The pop-up after submitting the form waited for 5 seconds')

        await expect(this.page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');
        console.log('Verified the thanks message')
    }

    async takeElementScreenShot(locator: string) {
        console.log('Started to take screenshot')

        const timestamp = new Date().getTime();
        console.log(`The time stamp is + ${timestamp}`)

        await this.page.locator(locator).screenshot({ path: `./screenshots/screenshot+${timestamp}.png` });
        console.log('Screenshot has taken successfully!')

        await this.closeBtn.click({ force: true })
    }
}

export default FormsPage;