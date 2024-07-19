## Prerequisites

#### Without Docker
1. NVM
2. Node v18.15.0
3. Stencil v7.1.2
4. babel-plugin-lodash v3.3.2

#### With Docker
1. Docker

## Quick Start With Docker and MAKE
```bash
make
## OR ##
docker-compose up -d
## OR ##
docker-compose up --force-recreate -d
```

#### Access URL 
http://localhost:7000

## Start Without MAKE

#### 1. Install NVM

#### 2. Choose Correct Node Version
```bash
nvm install 18.15.0 && nvm use 18.15.0
```

#### 3. Enable openssl-legacy-provider on Node
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

#### 4. Install stencil
```bash
npm install -g @bigcommerce/stencil-cli@7.1.2
```

#### 5. Install Dependencies
```bash
npm install
```

#### 6. Run Stencil
```bash
npm start
## OR ##
stencil start
```
