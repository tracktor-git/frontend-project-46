install:
	npm ci
lint:
	npx eslint .
fix:
	npx eslint . --fix
gendiff:
	node bin/gendiff.js