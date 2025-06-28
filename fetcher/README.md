# Fetcher API

Scrapes user data from competitive programming platforms.

## Setup

```bash
npm install
node index.js
```
Server runs on `http://localhost:3000`

## Usage

**GET** `/api/fetch/:username?platform=PLATFORM`

Supported platforms: `gfg`, `leetcode`, `codeforces`, `codechef`

### Examples

```bash
# GeeksforGeeks
curl "http://localhost:3000/api/fetch/ayush?platform=gfg"

# LeetCode
curl "http://localhost:3000/api/fetch/username?platform=leetcode"
```

### Response

```json
{
  "name": "User Name",
  "institution": "University",
  "totalProblemsSolved": "250",
  // ... more platform-specific data
}
```

## Errors

- `400` - Missing username/platform or invalid platform
- `500` - Scraping failed