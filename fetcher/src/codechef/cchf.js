//API is to be written
//API completed
import {firefox} from "playwright";

export default async function fetchCodeChef(username) {
    const browser = await firefox.launch({headless:true});
    const page = await browser.newPage();
    const targetUrl = `https://www.codechef.com/users/${username}/`

    await page.goto(targetUrl);
    
    const timeout = 10000;
    
    const data = {
        'name': await page.locator('div[class="user-profile-container"] h1').textContent({timeout}).catch(() => null),
        'username': await page.locator('span[class="m-username--link"]').textContent({timeout}).catch(() => null),
        'rating': await page.locator('div[class="rating-number"]').textContent({timeout}).catch(() => null),
        'highestRating': await page.getByText('Highest Rating').textContent({timeout}).catch(() => null),
        'contestsParticipated': await page.locator('div[class="contest-participated-count"] b').textContent({timeout}).catch(() => null),
        'totalProblemsSolved': await page.getByRole('heading', { name: 'Total Problems Solved:' }).textContent({timeout}).catch(() => null),
    };

    page.close();
    browser.close();

    return data;
}

// fetchCodeChef('gennady.korotkevich').then(console.log)