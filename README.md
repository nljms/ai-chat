# Simple Chat
A simple chat fullstack web application using Open AI built with React and Node JS.

## Prerequisites
Make sure you have installed the following on your machine:
- [Node](https://nodejs.org/en/download/package-manager) (at least v18+ or higher)
```bash
# install node link: https://nodejs.org/en/download/package-manager
# On a Mac use the following command

# installs nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)
nvm install 18

# verifies the right Node.js version is in the environment
node -v # should print `v18.20.3`

# verifies the right NPM version is in the environment
npm -v # should print `10.7.0`
```
> Note: if you aren't using Mac, the link above 👆🏽 provides you various ways to install node on your machine

- [pnpm](https://pnpm.io/) - is the package manager used in this project
- [bit cli](https://bit.dev/docs/getting-started/installing-bit/installing-bit/)
```bash
npx @teambit/bvm install
# you need to reload your bash profile to be able to access
```
- [docker](https://docs.docker.com/engine/install/) - for containerization
- [docker-compose](https://docs.docker.com/compose/install/) - if compose is not installed together with docker


## What's inside?
This project used [@teambit/bvm](https://bit.dev/) (bit) for bootstrapping the monorepo. You can read more about this tool on their [documentation page](https://bit.dev/docs/intro/)


## Up and running
- Add environment variables
```bash
# Add .env at the root folder
OPENAI_API_KEY=xxx
GROQ_API_KEY=xxx
```

- Install dependencies
```bash
bit install
```
- Check if the apps are listed
```bash
bit app list # should show 2 apps (chat-ui and chat-service)
```
- Run compose file
```bash
docker-compose up # -d (dettached mode)
# turn off services
docker-compose down
```
- Run the application
```bash
# backend
bit run chat-service
# frontend
bit run chat-ui
```

> Note: Whenever the backend service doesn't compile, try to run `bit install && bit run chat-service` to recompile the service. Then afterwards restart the frontend as well.
## Demo
This is how it currently works.

https://github.com/nljms/simple-chat/assets/25510386/51af1c39-c969-48c9-a1cc-fd44dd34437a



