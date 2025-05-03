# which-npm

A command-line utility to find and examine package.json files in your project tree.

## Overview

`which-npm` helps you locate the package.json file that a specific file or directory belongs to. This is particularly useful when working with complex project structures, monorepos, or when you need to quickly identify a package's metadata.

## Installation

```bash
npm install -g which-npm
```

## Usage

```bash
which-npm [path] [options]
```

If no path is provided, the current working directory is used.

### Examples

Basic usage (displays package name):
```bash
which-npm
# Output: my-awesome-package
```

Show the absolute path to the package.json file:
```bash
which-npm -p
# Output: /Users/username/projects/my-awesome-package/package.json
```

Show the relative path from `./dist/index.js` to the package.json file:

```bash
which-npm ./dist/index.js --path-relative
# Output: ../package.json
```

Display the entire package.json content:

```bash
which-npm -j
# Output: { "name": "my-awesome-package", "version": "1.0.0", ... }
```

Recursively find all parent package.json files:

```bash
which-npm -r
# Output: 
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

- Identify which package a file belongs to in monorepos and print the package name, path and json content
- Find the nearest `package.json` when working in *deeply nested* directories

## License

MIT
