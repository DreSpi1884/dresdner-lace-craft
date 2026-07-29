# Security audit notes

## React Router advisory GHSA-qwww-vcr4-c8h2

Reviewed: 29 July 2026

Installed versions:

- react-router-dom 7.18.2
- react-router 7.18.2

The GitHub Advisory Database currently lists react-router versions
>=7.12.0 and <8.3.0 as affected, with version 8.3.0 as patched.

The advisory explicitly applies only to applications using the unstable
React Server Components APIs.

This project is a client-rendered Vite application using BrowserRouter
and Routes. It does not use React Server Components or the unstable
React Router RSC APIs. Therefore, the vulnerable code path is not used
by the current application.

No forced major-version migration is applied. This assessment must be
reviewed if RSC APIs are introduced or a compatible patched release
becomes available.
