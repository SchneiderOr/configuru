# Configuru

A small remote configuration library written for browser and node built to be isomorphic and declerative

## Getting started

1. Clone this project `git clone git@github.com:SchneiderOr/configuru.git`
2. Run `yarn install` or `npm install` to get the project's dependencies
2. Run `yarn mock-server` or `npm run mock-server` to get the project's mock db server up and runing
2. In another terminal, run node example/node.js to see an actual example

## Scripts

* `yarn build` or `npm run build` - produces production version of your library for both node and web under the `dist` folder
* `yarn dev` or `npm run dev` - produces development version of your library and runs a watcher

## Examples
- To run the browser example:
	1. run the API server using yarn mock-server using `yarn mock-server` or `npm run mock-server`
	2. visit http://localhost:3000 and open up the browser console
- To run the node example:
	1. run the API server using yarn mock-server using `yarn mock-server` or `npm run mock-server`
	2. run node ./example/node
