const newLocal = 'googleapis'
const { google } = require(newLocal)


const { OAuth2 } = google.auth


const oAuth2Client = new OAuth2(
    '513118020260-v8v4mts57pg4c4jtck121l5uhvd7j9tn.apps.googleusercontent.com',
    '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'
)

oAuth2Client.setCredentials({
    refresh_token: '1//04zHxlyLjbZAmCgYIARAAGAQSNwF-L9IrqcgAg6EJSmArVR279Q1ZzzeJM_62-4fqacQOJEY8dIL76-MeAkbNFQwzo1V9rwSQuq8./.',
})


const calendar = google.calendar({ auth: oAuth2Client })


const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)


const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 4)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)


const event = {
    summary: `Meetivid`,
    location: `3595 California St`,
    description: `ing.`,
    colorId: 1,
    start: {
        dateTime: eventStartTime,
        timeZone: 'Russia/Moscow',
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'Russia/Moscow',
    },
}


calendar.freebusy.query(
    {
        resource: {
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'Russia/Moscow',
            items: [{ id: 'primary' }],
        },
    },
    (err, res) => {

        if (err) return console.error('Free Busy Query Error: ', err)


        const eventArr = res.data.calendars.primary.busy


        if (eventArr.length === 0)

            return calendar.events.insert(
                { calendarId: 'primary', resource: event },
                err => {

                    if (err) return console.error('Error Creating Calender Event:', err)

                    return console.log('Calendar event successfully created.')
                }
            )


        return console.log(`Sorry I'm busy...`)
    }
)