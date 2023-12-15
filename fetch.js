// const url = 'https://fon.bet/live/football'
// const url = 'https://line32w.bk6bba-resources.com/line/desktop/topEvents3?place=live&sysId=1&lang=ru&salt=1jv37vkkv8ilpoayj0f&supertop=4&scopeMarket=1600'
// const url = 'https://line04w.bk6bba-resources.com/line/desktop/topEvents3?place=line&sysId=1&lang=ru&salt=l7spdw9y6swlpobvq50&supertop=4&scopeMarket=1600'

// const url = 'https://line04w.bk6bba-resources.com/line/liveEventInfo/?lang=ru&sysId=1&eventId'
// const url = 'https://line04w.bk6bba-resources.com/line/desktop/topEvents3'
const url = 'https://line51w.bk6bba-resources.com/events/list'

// fetch(url)
// .then(data => {
//     console.log(data.text)
//     return data.text
// })
// .then (data => console.log(data));

const data = await fetch(url)
const dataJson = await data.json()

// console.log(dataJson)
// console.log(dataJson.events.length)
// console.log(dataJson.packetVersion)

// dataJson.sports.forEach(element => {
//     console.log(`${element.kind}`)
// })

const kindSports = dataJson.sports
    .filter(e => e.kind === "sport")
    .map(({ id, name }) => ({ id, name }))

const liga = dataJson.sports
    .filter(e => e.parentId === 1)
    .map(({ id: ligaId, name: ligaName }) => ({ ligaId, ligaName }))


// const matchEvents = dataJson.events
//     .filter(e => !e.parentId)
//     // .map(e => e.id)
//     .map(({id: eventsId, team1Id, team2Id, team1, team2, sportId}) => ({even


const matchEvents = dataJson.events
    .filter(e => !e.parentId)
    // .map(e => e.id)
    .map(({ id: eventsId, team1Id, team2Id, team1, team2, sportId }) => {
        const foundLiga = liga.find(id => id.ligaId === sportId)

        if (foundLiga) {
            return {
                ligaId: foundLiga.ligaId,
                ligaName: foundLiga.ligaName,
                eventsId,
                team1Id,
                team2Id,
                team1,
                team2
            };

        }
        return null;


    })

    .filter(Boolean)






// console.log(kindSports);
// console.log(kindSports.length);

// console.log(liga);
// console.log(liga.length);

console.log(matchEvents);

console.log(matchEvents.length);
console.log(dataJson.events.length);
