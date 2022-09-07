This is the capstone project of C21-group-7.

Project：to create a website including　skateboard shop & community. 

Group Member : Tina, Harry, Jade, Micky
&nbsp
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

    
=== Wire Frame ===
https://miro.com/app/board/uXjVPbXflLo=/

=== ERD Diagram ===
https://app.diagrams.net/#G1pCRSAkFpTMYU-rSwU2GJgvwTb9xjt_3C
