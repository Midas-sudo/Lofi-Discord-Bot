# Lofi Discord Bot

A Discord bot created with the sole pourpose to play a specific link (in my specific case a Lofi stream) from youtube when ever someone enters a specific voice channel. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For development and testing purposes, as well as for deployment you will need the following program:

![NodeJS](https://img.shields.io/badge/NodeJS-Download-333333?link=https://nodejs.org/en/&labelColor=689F63)

### Installing
A step by step series of examples that tell you how to get the development env running
Start by downloading the project from github to a local folder.

Open the terminal on the local folder where the files are and start by installing the dependecy modules required by the Bot. 

```
npm install
```

If done correctly you should see something like this and a total of arround 88 packages added
![docs/Readme_img/npm_install.png](docs/Readme_img/npm_install.png)

After the installation of the packages you are read to put the bot online but first there are some parts in the code that you will need to change, the first being the values inside the 'config (Template).json'
![docs/Readme_img/config.png](docs/Readme_img/config.png)
-Change the token to your own Bot token as well as the id's of the rooms that are going to be used
-The Prefix and the id of the role able to manage the bot in discord


After this steps save the file removing the template part of the name and its ready to put it online with the command
```
node .
```

## Deployment

To deploy just repeat the steps for development as they are the same.

## Extra Info

For more information about the BOT it self see the image 'HELP!!.png' inside the docs folder.