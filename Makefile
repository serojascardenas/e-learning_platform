# Init Scripts
.PHONY: dev-api
dev-api:
	cd backend && npm run dev

.PHONY: dev-ui
dev-ui:
	cd ui && npm run client

.PHONY: dev-start
dev-start: 
	make -j 2 dev-api dev-ui

# Installation scripst
.PHONY: install-ui
install-ui:
	cd ui && rm -rf node_modules && npm install

.PHONY: install-backend
install-backend:
	cd backend && rm -rf node_modules && npm install

.PHONY: install-dependencies
install-dependencies: install-ui install-backend