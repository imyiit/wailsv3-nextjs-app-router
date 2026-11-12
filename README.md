# wailsv3-nextjs-app-router

A desktop application built with [Wails v3](https://v3.wails.io/): a Go backend and a Next.js (App Router, static export) frontend, rendered by the operating system's native WebView.

## Tech stack

| Layer             | Technology                                            |
| ----------------- | ----------------------------------------------------- |
| Desktop framework | Wails v3                                              |
| Backend           | Go                                                    |
| Frontend          | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Task runner       | [Task](https://taskfile.dev/) (`Taskfile.yml`)        |

## Requirements

- Go 1.26 or newer
- Node.js and npm
- Wails v3 CLI
- On Linux: GTK and WebKitGTK development packages (`wails3 doctor` lists what is missing)

Install the Wails CLI:

```bash
go install github.com/wailsapp/wails/v3/cmd/wails3@v3.0.0
wails3 setup    # checks your system and installs missing tools
wails3 doctor   # verify your setup at any time
```

## Getting started

```bash
git clone https://github.com/imyiit/wailsv3-nextjs-app-router.git
cd wailsv3-nextjs-app-router
cd frontend && npm install && cd ..
```

## Development

```bash
wails3 dev
```

This starts the Next.js dev server and opens the application window.

- Changing Go code rebuilds and restarts the app.
- Changing frontend code updates the window through Next.js HMR, without a full reload.
- The dev server uses port `9245` by default. Set the `WAILS_VITE_PORT` environment variable to change it.

## Production build

```bash
wails3 build
```

The executable is written to the `bin/` directory:

```bash
./bin/go-test
```

The binary name comes from `APP_NAME` in `Taskfile.yml`.

## Project structure

```
.
├── main.go              # App entry point: window and service registration
├── greetservice.go      # Go service exposed to the frontend
├── Taskfile.yml         # Main tasks (build, dev, package, run)
├── build/               # Platform Taskfiles and config.yml
└── frontend/
    ├── app/             # Next.js App Router pages
    ├── bindings/        # Generated Go bindings (do not edit)
    ├── dist/            # Static export output (embedded by Go)
    └── next.config.*    # Dev/production settings
```

## Go and frontend communication

**Service methods.** Exported methods on Go services are generated as TypeScript functions under `frontend/bindings/`:

```tsx
import { Greet } from "../bindings/changeme/greetservice";

const message = await Greet("World");
```

**Events.** Go emits events and the frontend listens:

```go
app.Event.Emit("time", time.Now().Format(time.RFC1123))
```

```tsx
import { Events } from "@wailsio/runtime";

useEffect(() => {
  return Events.On("time", (event) => setTime(event.data));
}, []);
```

These calls only work inside the Wails window. If you open the dev server in a regular browser, they fail because the Wails runtime is not there.

## Next.js-specific setup

The Wails v3 template assumes Vite. These changes make it work with Next.js:

| Topic                 | What was done                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static output         | In production, `output: 'export'` and `distDir: 'dist'`. The Go side embeds `frontend/dist`                                                                                                                                   |
| Dev server flag       | The Vite-only `--strictPort` flag was removed from the `frontend:dev:npm` task in `build/Taskfile.yml`                                                                                                                        |
| Loading assets in dev | The window origin is `wails://localhost`, so in dev `next.config` sets `assetPrefix` and a CORS header for `/_next/*`. The port is read from the `WAILS_DEV_PORT` environment variable (set in the Taskfile from `VITE_PORT`) |
| Runtime package       | The `@wailsio/runtime` npm package is a frontend dependency                                                                                                                                                                   |
| Build script          | `wails3 build` compiles the frontend through the `build:dev` / `build` scripts, so both must exist in `package.json`                                                                                                          |
| Bindings imports      | The `.js` specifiers in `bindings/<module>/index.ts` do not resolve under Turbopack, so import the service file directly (`.../greetservice`)                                                                                 |

## Notes

- `frontend/bindings/` is generated by Wails and refreshed on every `wails3 dev` / `wails3 build` run. Do not edit it by hand.
- `wails3 update build-assets` can overwrite files under `build/`. Commit your Taskfile changes.
- The `gdk_x11_*` deprecation warnings during the build come from Wails' own C code and do not affect the build.

## Resources

- [Wails v3 documentation](https://v3.wails.io/)
- [Migrating from Wails v2 to v3](https://v3.wails.io/migration/v2-to-v3/)
- [Next.js documentation](https://nextjs.org/docs)
