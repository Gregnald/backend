//API completed
  const questionProgressQuery = `
    query userProfileUserQuestionProgressV2($userSlug: String!) {
      userProfileUserQuestionProgressV2(userSlug: $userSlug) {
        numAcceptedQuestions { count difficulty }
        numFailedQuestions { count difficulty }
        numUntouchedQuestions { count difficulty }
        userSessionBeatsPercentage { difficulty percentage }
        totalQuestionBeatsPercentage
      }
    }
  `;

  const skillStatsQuery = `
    query skillStats($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts {
          advanced {
            tagName
            tagSlug
            problemsSolved
          }
          intermediate {
            tagName
            tagSlug
            problemsSolved
          }
          fundamental {
            tagName
            tagSlug
            problemsSolved
          }
        }
      }
    }
  `;

  const languageStatsQuery = `query languageStats($username: String!) {
    matchedUser(username: $username) {
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }
`;

  const userPublicProfileQuery = `
    query userPublicProfile($username: String!) {
  matchedUser(username: $username) {
    contestBadge {
      name
      expired
      hoverText
      icon
    }
    username
    githubUrl
    twitterUrl
    linkedinUrl
    profile {
      ranking
      userAvatar
      realName
      aboutMe
      school
      websites
      countryName
      company
      jobTitle
      skillTags
      postViewCount
      postViewCountDiff
      reputation
      reputationDiff
      solutionCount
      solutionCountDiff
      categoryDiscussCount
      categoryDiscussCountDiff
      certificationLevel
    }
  }
}
  `;

  const userContestRankingInfoQuery = `
    query userContestRankingInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
  }
  userContestRankingHistory(username: $username) {
    attended
    trendDirection
    problemsSolved
    totalProblems
    finishTimeInSeconds
    rating
    ranking
    contest {
      title
      startTime
    }
  }
  }`;

  const userBadgesQuery = `
    query userBadges($username: String!) {
  matchedUser(username: $username) {
    badges {
      id
      name
      shortName
      displayName
      icon
      hoverText
      medal {
        slug
        config {
          iconGif
          iconGifBackground
        }
      }
      creationDate
      category
    }
    upcomingBadges {
      name
      icon
      progress
    }
  }
  }`;

  const userSessionProgressQuery = `
    query userSessionProgress($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
  }`;

  const query = [
  { name: "userProfileUserQuestionProgressV2", text: questionProgressQuery },
  { name: "skillStats", text: skillStatsQuery },
  { name: "languageStats", text: languageStatsQuery },
  { name: "userPublicProfile", text: userPublicProfileQuery },
  { name: "userContestRankingInfo", text: userContestRankingInfoQuery },
  { name: "userBadges", text: userBadgesQuery },
  { name: "userSessionProgress", text: userSessionProgressQuery }
];

//Uncomment and use the function below to fetch specific queries by index
// export default async function fetchLeetCodeStats(username,index = 0) {
//   const variables = { userSlug: username };

//   const headers = {
//     'Content-Type': 'application/json',
//     'Referer': `https://leetcode.com/u/${username}/`,
//   };

// const res = await fetch("https://leetcode.com/graphql/", {
//   method: "POST",
//   headers,
//   body: JSON.stringify({
//     query: query[index].text,
//     variables: query[index].name === "userProfileUserQuestionProgressV2"
//       ? { userSlug: username }
//       : { username }, // switch variable name depending on query
//     operationName: query[index].name
//   }),
// });


//     let data = await res.json();
//     if (!res.ok) {
//         console.error(`Error fetching LeetCode stats: ${data.message || res.statusText}`);
//         return;
//     }
//     data = data.data;
//     return data;
 
// }


// Main function to fetch all LeetCode stats
export default async function fetchLeetCodeStats(username) {
          const headers = {
            'Content-Type': 'application/json',
            'Referer': `https://leetcode.com/u/${username}/`,
          };

          const combinedData = {};

          for (let i = 0; i < query.length; i++) {
            try {
              const res = await fetch("https://leetcode.com/graphql/", {
                method: "POST",
                headers,
                body: JSON.stringify({
                  query: query[i].text,
                  variables: query[i].name === "userProfileUserQuestionProgressV2"
                    ? { userSlug: username }
                    : { username },
                  operationName: query[i].name
                }),
              });

              let data = await res.json();
              if (!res.ok) {
                console.error(`Error fetching ${query[i].name}: ${data.message || res.statusText}`);
                continue;
              }
              
              combinedData[query[i].name] = data.data;
            } catch (error) {
              console.error(`Error fetching ${query[i].name}:`, error);
            }
          }

          return combinedData;
        }

// Example usage:
// (async ()=> {
//     const result = await fetchLeetCodeStats("<username>", 0); // Change index to fetch different queries
//     console.log(result);
// })();