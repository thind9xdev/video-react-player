<a name="0.3.0"></a>
# 0.3.0 (2025-12-28)


### Bug Fixes

* fix .gitig ([660a7df](https://github.com/thind9xdev/video-react-player/commit/660a7df))
* fix player ([574b4fc](https://github.com/thind9xdev/video-react-player/commit/574b4fc))
* rebuild ([23e21b9](https://github.com/thind9xdev/video-react-player/commit/23e21b9))


### Features

* new react player ([1562002](https://github.com/thind9xdev/video-react-player/commit/1562002))
* update CI ([f2de338](https://github.com/thind9xdev/video-react-player/commit/f2de338))
* update test ([2b9c753](https://github.com/thind9xdev/video-react-player/commit/2b9c753))



<a name="0.2.0"></a>
# 0.2.0 (2025-12-28)


### Bug Fixes

* fix player ([574b4fc](https://github.com/thind9xdev/video-react-player/commit/574b4fc))
* rebuild ([23e21b9](https://github.com/thind9xdev/video-react-player/commit/23e21b9))


### Features

* new react player ([1562002](https://github.com/thind9xdev/video-react-player/commit/1562002))
* update test ([2b9c753](https://github.com/thind9xdev/video-react-player/commit/2b9c753))



<a name="0.21.4"></a>
## 0.21.4 (2025-12-26)


### Bug Fixes

* rm docs pages ([4a7349d](https://github.com/thind9xdev/video-react-player/commit/4a7349d))
* rm docs pages [#2](https://github.com/thind9xdev/video-react-player/issues/2) ([38a455b](https://github.com/thind9xdev/video-react-player/commit/38a455b))
* update react 19 ([511554c](https://github.com/thind9xdev/video-react-player/commit/511554c))
* update readme ([0a4bcf4](https://github.com/thind9xdev/video-react-player/commit/0a4bcf4))
* update support react 19 ([a107d5a](https://github.com/thind9xdev/video-react-player/commit/a107d5a))



# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Module Resolution:** Fixed a "Module not found" error when using the package with bundlers like Webpack. The `package.json` now points to the correct distribution files (`dist/` instead of `lib/`).
- **TypeScript Support:** Resolved an issue where `npm` would fail to find type definitions (`@types/video-react-player`). The package now correctly bundles and declares its own TypeScript types.
- **React 19 Compatibility:** Removed usage of the legacy `contextTypes` API in the `Player` component, fixing a critical error when using the library with React 19.
