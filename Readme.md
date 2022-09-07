This is the capstone project of C21-group-7.

Project：to create a website including　skateboard shop & community. 

Group Member : Tina, Harry, Jade, Micky

## folder structure
```
├── README.md
├── .github/workflows
│   └── cicd.yml
├── DAE
├── Project_Info
├── .gitignore
├── .dockerignore
├── package.json
├── tsconfig.json
├── Backend
│   ├── migrations
│   │   └── setUpTables.ts
│   ├── seeds
│   │   └── insertData.ts
│   ├── utils
│   │   ├── hash.ts
│   │   └── jwt.ts
│   ├── test
│   │   ├── services
│   │   │   └── userService.test.ts
│   │   └── controllers
│   │       └── userController.test.ts
│   ├── env
│   ├── env.example
│   ├── server.ts
│   ├── knexfile.ts
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── middlewares
│   ├── routes
│   ├── services
│   │   └── userService.ts
│   └── controllers
│       └── userController.ts
└── Frontend
    ├── public
    ├── src
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   ├── index.tsx
    │   ├── test
    │   │   └── App.test.tsx
    │   ├── api
    │   │   ├── utils.ts
    │   │   └── user.ts
    │   ├── component
    │   │   ├── Navbar.tsx
    │   │   └── footer.tsx
    │   └── pages
    │        ├── User.tsx
    │        └── Admin.tsx
    ├── redux
    │   ├── store.ts
    │   └── user
    │        ├── actions.ts
    │        ├── reducer.ts
    │        └── state.ts
    ├── docker-compose.yml
    ├── Dockerfile
    └── yarn.lock
```

## install workflow
(backend)
- [ ] yarn init -y
- [ ] yarn add  ts-node typescript @types/node
- [ ] yarn add express @types/express
- [ ] yarn add -D ts-node-dev
- [ ] yarn add express-session
- [ ] yarn add -D @types/express-session
- [ ] yarn add jsonfile @types/jsonfile
- [ ] yarn add formidable @types/formidable
- [ ] yarn add winston
- [ ] yarn add --save-dev --save-exact prettier
- [ ] yarn add pg @types/pg dotenv 
- [ ] yarn add xlsx
- [ ] yarn add socket.io
- [ ] yarn add bcryptjs @types/bcryptjs
- [ ] yarn add grant  dotenv @types/dotenv
- [ ] yarn add cross-fetch
- [ ] yarn add --dev jest
- [ ] yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
- [ ] yarn ts-jest config:init
- [ ] yarn add knex pg @types/pg
- [ ] yarn knex init -x ts
- [ ] yarn add --dev playwright 
- [ ] yarn add redis @types/redis

(frontend)
- [ ] npx create-react-app my-app --template typescript   /   npm init react-ts-template
- [ ] yarn add @testing-library/react @testing-library/jest-dom
- [ ] yarn add redux react-redux @types/react-redux
- [ ] yarn add redux-logger @types/redux-logger
- [ ] yarn add react-router-dom @types/react-router-dom react-router @types/react-router
- [ ] yarn add @reduxjs/toolkit
- [ ] yarn add redux-thunk
- [ ] yarn add --dev fetch-mock redux-mock-store @types/fetch-mock @types/redux-mock-store node-fetch@2
- [ ] yarn add immer
- [ ] yarn add map.prototype.tojson
- [ ] yarn add jwt-simple @types/jwt-simple permit @types/permit
- [ ] yarn add react-facebook-login @types/react-facebook-login
    
## Configs
### Prettier
### Prettier
- [ ] create a file of <.prettierrc>
```
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "overrides": [
        {
            "files": ["*.ts", "*.js"],
            "options": {
                "semi": true,
                "tabWidth": 2,
                "singleQuote": false,
                "printWidth": 100
            }
        }
    ]
}

```

### ts
- [ ] create a file of <tsconfig.json>
```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop": true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": ["node_modules", "build", "scripts", "index.js"]
}
```

### .gitignore
```
(Backend)
node_modules
.DS_Store
.env
package-lock.json
.prepare
```
```
(Frontend)
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

```
    
=== Wire Frame ===
https://miro.com/app/board/uXjVPbXflLo=/

=== ERD Diagram ===
https://app.diagrams.net/#G1pCRSAkFpTMYU-rSwU2GJgvwTb9xjt_3C
