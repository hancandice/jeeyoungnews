# news app

- used Newyork Times API (https://developer.nytimes.com/apis)
- user can search news articles through typing keywords
- it provides news clipping function

---

## Preview

<p align="center">
  <img src="assets/images/preview/newsapp.gif" width="50%">
</p>

## Running this app

First, download all modules listed in **package.json.**

```
npm install
```

or

```
yarn
```


<br />

Next, you need to start Metro, the JavaScript bundler for React Native.

Since this app is built with Expo, starting Metro is as simple as running the **expo start** command within the project folder.

```
expo start
```

<br />

Within the Metro bundler, click on **Run on Android device/emulator** or **Run on iOS simulator**.

Alternatively, you can simply enter the following commands to run the app on a simulator.

```
expo start --android
```

또는

```
expo start --ios
```

## Tools Used

- [x] Expo
- [x] React Redux
- [x] Redux Saga
- [x] Typescript
- [x] Async Storage
