//API completed
import {firefox} from "playwright";

import grabber from "./grabber.js";

export default async function fetchGFG(username) {
    const browser = await firefox.launch({headless:true});
    const page = await browser.newPage();
    const targetUrl = `https://www.geeksforgeeks.org/user/${username}/`

    await page.goto(targetUrl);
    
    const selectors = {
        'name': 'profilePicSection_head_userHandle__oOfFy',
        'languages': 'educationDetails_head_right--text__lLOHI',
        'scoreCard': 'scoreCards_head__G_uNQ',
        'POTD_streak': 'circularProgressBar_head_mid_streakCnt__MFOF1.tooltipped',
        'crntYrSubmissions': 'heatMapHeader_head_left__URMdZ',
        'problemDistribution': 'problemNavbar_head__cKSRi',
        'problemTags': 'problemListSection_head__JAiP6',
    };

    const data = {};
    for (const [key, selector] of Object.entries(selectors)) {
        data[key] = await grabber(page, selector, 5000, key);
    }

    page.close();
    browser.close();

    return data;
}

// fetchGFG('aviralsrivnkux').then(console.log)