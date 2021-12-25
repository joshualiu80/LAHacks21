## Inspiration

It's always been hard to stay in touch with people, especially friends and family who live abroad. Luna Talks is our solution.

The idea originated on a late-night drive from Irvine back to our homes in the Bay Area. When the song "Talking to the Moon" by Bruno Mars came on, we wondered if we could create an app for people to actually _talk to the moon_, or reach their loved ones in different locations and timezones around the world. Users would record audio messages, or snippets, send them into the void, and schedule them to deliver to their relatives the next morning. If a user happened to create their message while their recipient was asleep, it would quite literally be "talking to the moon," and delivering our greeting to the other person at the rising of the sun.

We quickly realized that this concept had limitless potential. Users could schedule snippets to send anytime — next month, next year, or anytime in the future, making it the perfect tool for forgetful people to send birthday messages in advance, relatives abroad to send an "on-time" congratulations to a niece or nephew graduating from college, coworkers to wish a colleague "good luck" on a job interview, or friends to check-in with each other on a periodic schedule.

We all agreed that we would love to have such an app in our personal lives, and the idea was born.

## What it does
Users can record audio messages, or snippets, and schedule them to deliver to friends and family at some time in the future.

This allows people to stay in touch with each other and send messages that are both wholesome and timely — regardless of the physical distance and timezones between them.

In addition, other than the functionality to direct-message a friend, Luna Talks provides a feature to listen to "tagged" snippets from the community.

If you've ever woken up on a Moody Monday Morning and just couldn't get out of bed, the "Moody Mondays" tag is perfect for you. If you've ever wanted to hear productivity tips from fellow students and professionals, check out the "Productivity" tag.

Luna Talks currently comes with 5 tags — Moody Mondays, Productivity, Motivation, Pick Me Ups, and Story Time — with plans to add more, and each tag provides a curated feed of snippets under a specific category for listeners to enjoy.

## How we built it

Our backend was built with Node / Express, our database was a combination of MongoDB atlas and a home server run by one of our teammates. Our frontend was completed using React.js. All of our audio functionality was done with the help of the Web Audio API and react-mic.

## Challenges we ran into

We had many issues trying to figure out how to store / record audio messages effectively on our database layout. We went through many iterations in how to accomplish this and decided on storing the file names in our database while the actual audio files themselves were stored on our server. Sending the audio files to the server presented another challenge in which we had to encode our audio Blob into an mp3 before sending it off to our backend.

Styling our website also presented an interesting challenge as we pushed ourselves to make adventurous choices to design an app with a modern design. We came up with a lot of creative solutions, such as displaying each friend profile as a 'planet' that was randomly position on our page.

## Accomplishments that we're proud of

We are proud of our concept for our app. Our entire team was extremely excited to tackle this project and are proud of the quality work that we've been able to accomplish in the last two days, as well as the fact that we've learned so much in such a short amount of time.

What we learned
We learned a lot more about storing / passing audio, and how to display that audio on the frontend using various libraries.

## What's next for Luna Talks

Reddit with audio :0, stay tuned!

## Technologies Used

Express.js, MongoDB, Mongoose, Node.js, React
