# Security audit notes

## React Router advisory GHSA-qwww-vcr4-c8h2

Reviewed: 29 July 2026

Installed version:

- react-router-dom 7.18.2
- react-router 7.18.2

The official React Router advisory lists versions >=7.12.0 and <7.18.2
as affected and version 7.18.2 as patched.

The advisory applies only to applications using the unstable React Server
Components APIs. This project is a client-rendered Vite application using
BrowserRouter and does not use the unstable RSC APIs.

npm audit currently reports the installed patched version because its
displayed affected range combines the separate version 7 and version 8
ranges. No forced downgrade or major-version migration is applied.
