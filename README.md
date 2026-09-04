# [Slack-Chat](https://slack-chat-oalb.onrender.com)

## Description
SPA web app based on react with a backend-server
Slack-based chat with registration, channels and real-time messaging
Backend service is provided by @hexlet/chat-server lib

## Features
- Sign in, log in and log out
- Protected routes
- add, rename & delete channels
- channels swith
- messages synchronization via Socket.IO
- profanity filter in Ru & En
- forms validation & error mesages
- Rollbar errors monitoring
- RU interface

## Hexlet checks:
[![hexlet-check](https://github.com/NastyaSinitsyna/slack-chat/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/NastyaSinitsyna/slack-chat/actions/workflows/hexlet-check.yml)

## Stack
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4-010101?logo=socketdotio&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-5FA04E?logo=nodedotjs&logoColor=white)


## Development Tools
![Axios](https://img.shields.io/badge/Axios-HTTP-5A29E4?logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-Forms-2563EB)
![Yup](https://img.shields.io/badge/Yup-Validation-4B5563)
![i18next](https://img.shields.io/badge/i18next-i18n-26A69A?logo=i18next&logoColor=white)
![Rollbar](https://img.shields.io/badge/Rollbar-Monitoring-FB5A5A?logo=rollbar&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)

## Requirements
Node.js & npm

## Setup
```bash
make install
```

## Develop
```bash
make develop
```

## Production Build
```bash
make build
```

## Local Development
- Interface
```bash
on localhost:5002
```

- Socket.IO
```bash
on localhost:5001
```