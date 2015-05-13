Changelog
=========

- v0.1.0 - Initial release
- v0.1.1 - added `util.reqFn`, `util.pth`, and `util.loadAppSettings`
- v0.1.2 - added `util.stripYamlFront`
- v0.1.4 - added `util.ucwords`
- v0.1.5 - added `util._deepExtend`
- v0.1.6 - `util.loadAppSettings` now behaves as expected with nested objects
- v0.1.7 ~~upgrade to latest `yaml-front-matter` (with my [pull request](https://github.com/dworthen/js-yaml-front-matter/pull/1)!)~~ This has been unpublished from NPM.
- v0.1.8 Use my fork of `js-yaml-front-matter`, which npm installs cleanly.
- v0.1.9 `util.expandSourceFiles`, first unit tests added, first release using grunt release, LICENSE
- ~~v0.1.10~~ Not published
- v0.1.11 added `util.copyObj`


# v0.2.0

- consume `shared-grunt-config`
- write tests for, and fix bugs in `loadAppSettings`
- full version bump due to change in `pth` and uncertaintity with compatibaility breakage

# v0.2.1

- update `expandSourceFiles` to invoke `path.resolve` rather than `path.join`.

# v0.2.2

- Lint the JS
