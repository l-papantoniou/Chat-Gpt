const puppeteer = require('puppeteer');

/*
   We used Puppeteer to open a browser instance, create a new page, navigate to our target URL,
   extract the mentioned data, and then close the browser. For visual debugging purposes,
   I am using the non-headless mode of the browser.
 */
const bookingScraperService = {

    scrapBookingData: async (booking_url) => {
        // Launch Puppeteer
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        })

        const page = await browser.newPage()

        // Navigate to the channel URL
        await page.goto(booking_url)


        // Extract hotel name

        const name = await page.evaluate(() => {

            const name = document.querySelectorAll('div[data-capla-component-boundary="b-property-web-property-page/PropertyHeaderName"]')

            // Check if there are any names and return the first one's text content
            return name.length > 0 ? name[0].textContent : null;

        })

        // Extract hotel description

        const description = await page.evaluate(() => {

            const description = document.querySelectorAll('div[id="property_description_content"]')

            // Check if there are any description and return the first one's text content
            return description.length > 0 ? description[0].textContent : null;
        })

        // Extract hotel location

        const location = await page.evaluate(() => {
            // Select the element using one of its classes
            const location = document.querySelector('.hp_address_subtitle');

            // Return the text content of the element
            return location ? location.textContent.trim() : null;
        });


        // Extract amenities and services

        const highlights = await page.evaluate(() => {
            // Select the element using one of its classes
            const highlights = document.querySelectorAll('div[class="property-highlights ph-icon-fill-color"]');

            // Return the text content of the element
            return highlights.length > 0 ? highlights[0].textContent.trim() : null;
        });


        // Extract amenities and services

        const amenities = await page.evaluate(() => {
            // Select the element using one of its classes
            const amenities = document.querySelectorAll('div[data-testid="property-most-popular-facilities-wrapper"]');


            // Return the text content of the element
            return amenities.length > 0 ? amenities[0].textContent : null;
        });

        const type = await page.evaluate(() => {

            const hotelTypes = ["hotel", "boutique", "resort", "hostel", "inn", "B&B", "luxury", "budget", "apartment"];

            let types = hotelTypes.filter(type => description.toLowerCase().includes(type));

            return type.length > 0 ? type : null

        });


        // // Extract amenities and services
        //
        // const amenities = await page.evaluate(() => {
        //     let results = [];
        //     // Example: extract amenities from a specific section
        //     document.querySelectorAll('.e1eebb6a1e e6208ee469').forEach((section) => {
        //         const categoryName = section.querySelector('.d1ca9115fe').innerText;
        //         const items = Array.from(section.querySelectorAll('.a53cbfa6de e6208ee469 .a5a5a75131')).map(item => item.innerText);
        //         results.push({category: categoryName, items: items});
        //     });
        //     return results;
        // });


        await browser.close()

        return {name, description, location, highlights, amenities, type};
    }

}

module.exports = bookingScraperService;