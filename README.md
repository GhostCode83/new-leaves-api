# New Leaves

https://new-leaves-app.vercel.app/

As time passes and seasons in our lives change, we sometimes let go of old traditions and gain new ones. This app provides a place for users to 'grow new leaves', or learn new traditions through an exchange of ideas and community discourse. This is for anyone coming into a new phase of their lives and looking to see what other people have already done and to see if it might work for them. The goal is to help users transition from old leaves, which they no longer find useful, to new leaves that have great meaning in their lives.

![Screen Shot 2021-01-24 at 9 56 41 AM](https://user-images.githubusercontent.com/58892815/105634242-155db700-5e2b-11eb-9615-155980c5f9a1.png)

## Technologies used: ##
- Node
- Express
- PostgreSQL 
- JavaScript ES6

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
