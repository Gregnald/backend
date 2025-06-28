import express from 'express';
import * as exp from './exporter.js';

const app = express();


app.get('/api/fetch/:username', async (req, res) => {
    let { username } = req.params;
    let { platform } = req.query;
    username = username.toLocaleLowerCase();
    platform = platform.toLocaleLowerCase();
    console.log(`Fetching data for username: ${username}, platform: ${platform}`);
    if (!username || !platform) {
        return res.status(400).json({ error: 'Username and platform are required.' });
    }

    try {
        let data;
        switch (platform.toLowerCase()) {
            case 'gfg':
                data = await exp.GFG(username);
                break;
            case 'leetcode':
                data = await exp.LeetCode(username);
                break;
            case 'codeforces':
                data = await exp.Codeforces(username);
                break;
            case 'codechef':
                data = await exp.CodeChef(username);
                break;
            default:
                return res.status(400).json({ error: 'Unsupported platform.' });
        }
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});