install:
	npm ci
lint:
	npx eslint .
fix:
	npx eslint . --fix
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
gendiff:
	node bin/gendiff.js
