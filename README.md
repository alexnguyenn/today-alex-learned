## Today Alex Learned

***This project is a work-in-progress.***

A Next.js app to help me keep track of my notes (programming-related). 
An alternative to messaging to myself in Slack :sweat_smile:

Deployed to Vercel at [todayalexlearned.vercel.app](https://todayalexlearned.vercel.app/). 
Bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This app was previously a [React front-end](https://github.com/alexnguyenn/today-alex-learned-cra) deployed on Surge.sh and a [Express back-end](https://github.com/alexnguyenn/today-alex-learned-express) (for securely sending GraphQL mutations to GraphCMS) deployed on Heroku.


**Main tools used:**
* [GraphCMS](https://graphcms.com/): GraphQL Content API for my notes. Very quick and easy to set up. 
* [Apollo Cilent](https://www.apollographql.com/docs/react/): For working with GraphQL. 
* [MUI](https://github.com/mui-org/): For creating the interface.
* [react-markdown](https://github.com/remarkjs/react-markdown) and [react-simplemde-editor](https://github.com/RIP21/react-simplemde-editor) for working with Markdown content. 
