# A simple Assistance Request form with API response confirmations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Bootstrap 4

## Installation
  * Clone this repo
  * run `docker pull uniteus/fake_api` to fire up this [Docker Image](https://hub.docker.com/r/uniteus/fake_api/ "docker image")
  * run `docker run -p 49567:49567 uniteus/fake_api:latest` to run API endpoints
  * `npm install` to install all dependencies
  * `npm start` to start react app server (localhost:3000)

## Features
  * First Name, Last Name, Email, Service Type, Terms of Service validations
    * Submission is allowed when required fields are not blank and terms agreed/checked
  * Populated service types dropdown through API request
  * API response confirmations with user input details

## Technologies
  * Create React App
  * Bootstrap 4
  * Docker & Docker-Machine

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.