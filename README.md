# gamejolt-ts-sdk
The Typescript SDK for https://gamejolt.com/game-api

### Usage 

Created and tested with HTML Gamejolt games.

By default *gjapi_token* and *gjapi_username* are provided in url when game is started. This SDK handles those internally and do not need to provided.

To start using simply do following after installing the package: 

```
const your_game_id = 123456;
const api = GamejoltSDK.create("your_private_key", your_game_id)
await api.trophies.addAchieved("hello");
```

