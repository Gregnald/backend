//API is to be made
import {firefox} from "playwright";

export default async function fetchCodeforces(username) {
    const browser = await firefox.launch({headless:true});
    const page = await browser.newPage();
    const targetUrl = `https://codeforces.com/profile/${username}/`

    await page.goto(targetUrl);
    
    const timeout = 10000;

    const data = {
        // 'name' : await page.locator('div.info div.main-info').locator('div').nth(1).textContent({timeout}).catch(() => null),
        'username' : await page.locator('div[class="info"] h1 a').textContent({timeout}).catch(() => null),
        'contestRating' : await page.locator('div.info ul li span').first().textContent({timeout}).catch(() => null),
        'maxSpecialist' : await page.locator('div.info ul li span').nth(1).textContent({timeout}).catch(() => null),
        'contributions' : await page.locator('div.info ul li').nth(1).locator('span').textContent({timeout}).catch(() => null),
        'userActivityKeys' : await page.locator('div._UserActivityFrame_counterDescription').allInnerTexts({timeout}).catch(() => null),
        'userActivityValues' : await page.locator('div._UserActivityFrame_counterValue').allInnerTexts({timeout}).catch(() => null),
    };

    page.close();
    browser.close();
    
    return data;
}
//DONE
// fetchCodeforces('ayush').then(console.log).catch(console.error);