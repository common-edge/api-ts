const fs = require('fs');
const path = require('path');

// To make changes to the generated tsconfig.json - go to the end of the file and 
// update the config object.

const findPackages = (dir) => {
	const entries = fs.readdirSync(dir, {withFileTypes: true});

	const match = entries.find(ent => ent.name === 'package.json');
	if (match) return [dir + path.sep + 'package.json'];

	const subdirs = entries
		.filter(ent => ent.isDirectory())
		.map(ent => dir + path.sep + ent.name);
	return [].concat(...subdirs.map(findPackages));
};

const nodePaths = process.env.NODE_PATH.split(path.delimiter);

const pkgs = [].concat(...nodePaths.reverse().map(findPackages));
const paths = Object.assign({}, ...pkgs.map(pkg => {
	const desc = JSON.parse(fs.readFileSync(pkg));
	return {[desc.name]: [path.dirname(pkg)]};
}));

const typeRoots = Object.keys(paths)
	.filter(pkg => /^@types/.test(pkg))
	.map(pkg => path.dirname(paths[pkg][0]));

const config = {
	compilerOptions: {
		// type checking
		noImplicitAny: true,
		strict: true,
		noUnusedLocals: true,
		noUncheckedIndexedAccess: true,
		noPropertyAccessFromIndexSignature: true,
		noImplicitThis: true,
		noImplicitReturns: true,

		composite: true,
		moduleResolution: 'node',
		skipLibCheck: true,
		lib: [ 'ES2020', 'DOM' ],
		target: 'es2015',

		rootDir: 'src',
		outDir: 'dist',

		// setup
		typeRoots,
		baseUrl: '.',
		paths,
	}
};

fs.writeFileSync('tsconfig.json', JSON.stringify(config, null, 2));
