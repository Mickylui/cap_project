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
    ├── package.json
    ├── tsconfig.json
    ├── docker-compose.yml
    ├── Dockerfile
    └── yarn.lock
```

## install workflow
- [ ] yarn init -y
- [ ] yarn install  ts-node typescript @types/node
- [ ] yarn install express @types/express
- [ ] yarn install -D ts-node-dev
- [ ] yarn install express-session
- [ ] yarn install -D @types/express-session
- [ ] yarn install jsonfile @types/jsonfile
- [ ] yarn install formidable @types/formidable
- [ ] yarn install winston
- [ ] yarn install --save-dev --save-exact prettier
- [ ] yarn install pg @types/pg dotenv 
- [ ] yarn install xlsx
- [ ] yarn install socket.io
- [ ] yarn install bcryptjs @types/bcryptjs
- [ ] yarn install grant  dotenv @types/dotenv
- [ ] yarn install cross-fetch
- [ ] yarn add --dev jest
- [ ] yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
- [ ] yarn ts-jest config:init
- [ ] yarn add knex pg @types/pg
- [ ] yarn knex init -x ts
- [ ] yarn add --dev playwright 
- [ ] yarn add redis @types/redis


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
