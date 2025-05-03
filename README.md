# which-npm

`which-npm` is a command-line utility that helps you locate the package.json file that a specific file or directory belongs to.

## Installation

```bash
npm install -g which-npm
# or simply run through npx
npx which-npm
```

## Usage

```bash
# If no path is provided, the current working directory is used.
which-npm [path] [options]
```

### Examples

Basic usage (displays package name):
```bash
which-npm
# my-awesome-package
```

Show the absolute path to the package.json file:

```bash
which-npm -p
# /Users/username/projects/my-awesome-package/package.json
```

Show the relative path from `./dist/index.js` to the package.json file:

```bash
which-npm ./dist/index.js --path-relative
# ../package.json
```

Display the entire package.json content:

```bash
which-npm --json
# { "name": "my-awesome-package", "version": "1.0.0", ... }
```

Recursively find all parent package.json files:

```bash
which-npm -r
# my-awesome-package
# parent-workspace
# root-project
```

### Options

For a full list of options, run:

```bash
which-npm --help
```

## Use Cases

- Identify which package *a file belongs to* in monorepos and print the package name, path or json content
- Find the nearest `package.json` when working in *deeply nested* directories

## License

MIT
