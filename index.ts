import { Command } from 'commander';
import { readPackageUp } from 'read-package-up';
import { version } from './package.json';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .name('which-npm')
  .description("Locate the package.json file that a specific file or directory belongs to")
  .version(version)

interface Options {
  path: boolean;
  pathRelative: boolean;
  json: boolean;
  recursive: boolean;
}

program
  .argument('[path]', 'Path to the file or directory. Default to current working directory', process.cwd())
  .option('-p, --path', 'Output the path of the found package.json file')
  .option('--path-relative', 'Output the path of the found package.json file relative to the [path] argument')
  .option('-j, --json', 'Output the found package.json file')
  .option('-r, --recursive', 'Search recursively for package.json file')
  .action(async (p: string, options: Options) => {
    let res = await printPkgInfo(p, options);

    if (!res) {
      console.log('No package.json found');
      return;
    }

    if (!options.recursive) {
      return;
    }

    while (res) {
      const nextPath = path.resolve(path.dirname(res.path), '..');
      res = await printPkgInfo(nextPath, options);

      if (!res) {
        break;
      }
    }
  });

async function printPkgInfo(p: string, options: Options) {
  // check if path is a file or directory
  if (!fs.existsSync(path.resolve(p))) {
    console.log('Path does not exist');
    return;
  }

  const res = await readPackageUp({
    cwd: p
  })

  if (!res) {
    return res;
  }

  if (options.path) {
    console.log(res.path);
  } else if (options.pathRelative) {
    console.log(path.relative(p, res.path));
  } else if (options.json) {
    console.log(JSON.stringify(res.packageJson, null, 2));
  } else {
    // Default behavior: print the package name
    console.log(res.packageJson.name);
  }

  return res;
}

program.parse();
