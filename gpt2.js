import puppeteer from 'puppeteer';
import { log } from 'util';


export async function gamesData() {
    const browser = await puppeteer.launch({
        headless: false
        // devtools: true
    });
    const page = await browser.newPage();
    const url = 'https://fon.bet/live/football';

    await page.goto(url);

    // Wait for the specific game elements to be present
    const selector = '.foot-info__menu-item';
    await page.waitForSelector(selector);


    await page.setViewport({
        width: 7680,
        height: 4320,
    });

    const games = await page.$$('div[class^="sport-base-event--"]');
    let gamesList = [];

    for (const game of games) {
        try {
            // Check if the 'a' element is present within the game element
            const linkElement = await game.$('a');
            if (linkElement) {
                const link = await game.$eval('a', e => e.href);
                const ligaEventIds = link.match(/\d+/g);
                // console.log('Link : ', link);

                const teams = await game.$eval('div.sport-base-event--pDx9cf > div > div ', e => e.innerText)

                const rate1 = await rate(game, 4)
                const ratex = await rate(game, 5)
                const rate2 = await rate(game, 6)


                const arrayTeams = teams.split("—")
                const team1 = arrayTeams[0].trim()
                const team2 = arrayTeams[1].trim()
                const eventId = parseInt(ligaEventIds[1], 10)


                // console.log(`Event ID ${eventId}  Teams ${team1} -- ${team2} 1 = ${rate1}; x = ${ratex}; 2 = ${rate2}`)
                gamesList.push({ eventId, team1, team2, rate1, ratex, rate2 })


            } else {
                // console.log('Not found: No "a" element within the game element');
            }
        } catch (error) {
            console.log('Not found:', error.message);
        }
    }


    const gamesArray = gamesList.filter((obj, index, self) =>
        index === self.findIndex(e => e.eventId === obj.eventId)
    );
    console.log('total games list', gamesList.length)
    console.log('total games Array', gamesArray.length)
    console.log(gamesArray)


    await page.waitForTimeout(1000);

    // Don't forget to close the browser when you're done
    await browser.close();
    return gamesArray;
}


// async function rate(game, n) {
//     const rateN = await game.$eval(`div.sport-base-event--pDx9cf > div:nth-child(${n}) `, e => e.innerText)
//     const rateNumber = rateN.replace(/-/g, '0')

//     return rateNumber
// }

async function rate(game, n) {
        const rateN = await game.$eval(`div.sport-base-event--pDx9cf > div:nth-child(${n}) `, e => e.innerText)
        const rateNumber = rateN.replace(/-/g, '0')
        const keyDate = new Date().getTime()
        const rateObj = {
        // keyDate: rateNumber
        [keyDate]: rateNumber
        }
        return rateObj;
    }



    const test =  await gamesData()

    console.log(Object.values(test.rate1[0]));