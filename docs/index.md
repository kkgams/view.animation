---
title: view.animation
status: reference

---

# view.animation

Animation tree, selector, parameters and blend-space editors for [GAMS](https://github.com/kkgams/gams). Each View is independently installable; Host utilities and widgets remain external dependencies.

| View | Source | Screenshot | Original work |
| --- | --- | --- | --- |
| `view-animation-tree` | [views/view-animation-tree.js](https://github.com/kkgams/view.animation/blob/release/src/view.animation-tree/views/view-animation-tree.js) | Not available | GAMS contributors |
| `view-animation-selector` | [views/view-animation-selector.js](https://github.com/kkgams/view.animation/blob/release/src/view.animation-selector/views/view-animation-selector.js) | Not available | GAMS contributors |
| `view-animation-parameters` | [views/view-animation-parameters.js](https://github.com/kkgams/view.animation/blob/release/src/view.animation-parameters/views/view-animation-parameters.js) | Not available | GAMS contributors |
| `view-animation-blend-space-1d` | [views/view-animation-blend-spaces.js](https://github.com/kkgams/view.animation/blob/release/src/view.animation-blend-space-1d/views/view-animation-blend-spaces.js) | Not available | GAMS contributors |
| `view-animation-blend-space-2d` | [views/view-animation-blend-space-2d.js](https://github.com/kkgams/view.animation/blob/release/src/view.animation-blend-space-2d/views/view-animation-blend-space-2d.js) | Not available | GAMS contributors |

## Development

Requires Node.js 24+, Python 3, Make, curl, tar, unzip and zip. No compilation or package installation is required.

| Command | Purpose |
| --- | --- |
| `make open` | Open local gams.json in the released macOS Apple Silicon Host. |
| `make check` | Check View JavaScript syntax. |
| `make test` | Check syntax and blend registration/model behavior. |
| `make package` | Build five independent ZIPs and SHA256SUMS under build.nosync/. |
| `make docs` | Build pinned wiki v1.4.0 under build.nosync/site/. |
| `make serve-docs DOCS_PORT=8081` | Preview the wiki on an independent port. |
| `make validate-docs` | Validate wiki content and links. |
| `make clean` | Remove build.nosync and identified downloaded Host/Unit caches; refuse tracked files or symlinks and preserve supplied tools/Units. |

The local Project starts an unsaved animation tree; save authored trees before reopening. It uses canonical sources and pinned published dependencies. Missing Host imports, config or schemas are errors. GUI editing, playback and DOM blend events are not covered by the native tests.
