# mip-redux-saga

This is a minimal project (mip) for [Redux-saga](https://redux-saga.js.org). The primary goal of the repo is to learn this library.

## Counter

A UI component which keeps track of a counter in state.

Purpose: basic example of mutating state using redux-saga. This example has the most comments around basic setup and integration with redux-toolkit.

## IP address

A UI component which surfaces our guest's current IP adress.

Purpose: example of working with a simple fetch API.

**Fetching IP data**

This stack calls against https://api.myip.com to display the user's current IP. This is done via an HTTP proxy, configured in [setupProxy.js](./src/setupProxy.js).

See also: https://www.telerik.com/blogs/dealing-with-cors-in-create-react-app
