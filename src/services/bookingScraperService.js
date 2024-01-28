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
            headless: "new",
            args: ['--start-minimized'],
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

            // Use a different variable name for the querySelectorAll result
            const descriptionElements = document.querySelectorAll('div[id="property_description_content"]');

            // Check if there are any description elements and return the first one's text content
            return descriptionElements.length > 0 ? descriptionElements[0].textContent : null;
        });


        // Extract hotel location

        const location = await page.evaluate(() => {
            // Select the element using one of its classes
            const location = document.querySelector('.hp_address_subtitle');

            // Return the text content of the element
            return location ? location.textContent.trim() : null;
        });


        // Extract assets and amenities

        const assets = await page.evaluate(() => {
            // Select the element using one of its classes
            const assets = document.querySelectorAll('div[data-testid="property-most-popular-facilities-wrapper"] li');

            // Extract the text content of each amenity and remove duplicates
            const assetslist = Array.from(new Set(Array.from(assets).map(el => el.textContent.trim())));

            return assetslist; // Return the array of amenities
        });

        const type = await page.evaluate((description) => {
            const hotelTypes = ["hotel", "house", "suites", "boutique", "resort", "hostel", "inn", "B&B", "luxury", "budget", "apartment"];

            let type = hotelTypes.find(type => description.toLowerCase().includes(type));

            return type || null; // Return the type or null if none is found
        }, description); // Pass description as an argument here

        await browser.close()

        return {name, description, location, type, assets};
    }

}

module.exports = bookingScraperService;