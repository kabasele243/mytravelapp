# MytravelApp

![MyTravel Image](./public/img/Capture.PNG)

MyTravelApp is an app designed to solve the problems of travelers who wanna unique destinations around the world.

## Prerequisites
This project requires running Node.js, we recommend using the latest LTS version (even-numbered). You may run into issues otherwise. Check [nodejs.org](https://nodejs.org/) for the latest release. Run `node -v` to determine the version of Node.js you are currently using.

If you don't have Node.js installed, please download it and follow the instructions relevant to your platform here: Check (https://nodejs.org/)

If it's properly installed, you should be able to run this without error in your terminal:

`node -v`


### Tech Stack

:rocket: Pug

:flying_saucer: Node

:artificial_satellite: MongoDB

:airplane: Express

# Features & Designs

The current design that I have for the app is to have eight different sections.


# To Contribute here (version control)

1. Click on Fork at the top right corner
2. Clone your forked repository
3. `cd` into the cloned folder | GrowersBrains
4. `git remote add upstream https://github.com/kabasele243/mytravelapp`
5. `git pull upstream` <YOUR_BRANCH>
6. Check out to the task branch by `git checkout -b` <NAME_OF_THE_TASK>

# To run the app in development

1. Run `npm install` from the **root** and also from the **client** folder
2. run `npm run dev` from the root
   Note: If you want to run backend only, run `npm run start`

## Set environment variables

You can create a .env file in your root project folder and add theses configurations. Be sure to modify the values beforehand. **_Never commit .env file to github._**

```bash
NODE_ENV=development
PORT=YOUR_PORT
DATABASE=YOUR_MONGO_URI
DATABASE_PASSWORD=YOUR_MONGO_PASSWORD

JWT_SECRET=YOUR_JWT_SECRET
JWT_EXPIRES_IN=YOUR_EXPIRATION_DATE
JWT_COOKIE_EXPIRES_IN=YOUR_TIME_LIKE_40

```

# Creating a pull request (when done with your code/changes)

1. Run `git add .`
2. Run `git commit -m` <COMMIT_MESSAGE>
3. `git push origin` <BRANCH_NAME>

Go to the repository https://github.com/kabasele243/mytravelapp.

As soon as you get there, you are going to see a green **Compare and Create a pull request**.

Click on it and type your message then click on **Create pull request**.


## Running the application

To run the application _without_ hot-reloading (code changes not picked up automatically), run:

`npm start`

To run the application _with_ hot-reloading (code changes picked up automatically), run:

`npm run dev`

To lint the code and run automated tests, use:

`npm test` or `npm t`

To check out the other "run" scripts available in this project, try:

`npm run`

