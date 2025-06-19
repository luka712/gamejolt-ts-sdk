# gamejolt-ts-sdk

[![Build Status](https://circleci.com/gh/luka712/gamejolt-ts-sdk.svg?style=svg)](https://app.circleci.com/pipelines/github/luka712/gamejolt-ts-sdk)

The Typescript SDK for https://gamejolt.com/game-api

## Usage

Created and tested with HTML Gamejolt games.

By default *gjapi_token* and *gjapi_username* are provided in url when game is started. This SDK handles those internally and do not need to provided.

To start using simply do following after installing the package:

```js
const your_game_id = 123456;
const api = GamejoltSDK.create("your_private_key", your_game_id)
await api.trophies.addAchieved("your_trophy_id");
```

### NodeJS

The SDK depends on `fetch`. Therefore, to use the library from a NodeJS environment, you need to install `node-fetch`:

```bash
npm install --save gamejolt-ts-sdk node-fetch
```

Next, pass in the `fetch` implementation to the SDK:

```js
import { create } from "gamejolt-ts-sdk";
import fetch from "node-fetch";

const your_game_id = 123456;
const api = create("your_private_key", your_game_id, { fetch });
await api.trophies.addAchieved("your_trophy_id");
```
