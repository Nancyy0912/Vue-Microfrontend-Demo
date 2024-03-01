# Vue Microfrontend Application

This project demonstrates a microfrontend architecture using Vite modern federation.

## Features ✨
 
- **Modularity**: Breaks down large applications into smaller, independently deployable and maintainable modules.
- **Independent Development**:Allows teams to work on different parts of the application using their preferred frameworks and technologies.
- **Scalability**: Enables horizontal scaling by adding new features or modules without affecting existing ones.
- **Isolation**: Provides isolation between microfrontends, reducing the impact of changes or issues in one microfrontend on others.
- **Code Reuse**: Promotes code reuse through shared components, libraries, and utilities across multiple microfrontends.
- **Deployment Flexibility**: Supports independent deployment of microfrontends, facilitating continuous delivery and faster time-to-market. 

## Project Structure

```
my-microfrontend-app/
│
├── menu/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MenuList.vue
│   │   │   
│   │   ├── store
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── pubsub.js
│   ├── package.json
│   └── vite.config.js
│
├── cart/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.vue
│   │   ├── store
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── pubsub.js
│   ├── package.json
│   └── vite.config.js
│
├── container/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.vue
│   │   ├── router
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── pubsub.js
│   ├── package.json
│   └── vite.config.js
│
├── header/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.vue
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── vite.config.js
│
│
└── package.json

```

## Scripts

```bash
# Clone the repository
git clone https://github.com/Nancyy0912/Vue-Microfrontend-Demo.git

### Install dependencies
```bash
cd vue-microfrontend-demo
npm install
```
### Compiles all modules for development
npm run dev
### Build all modules for production
npm run build
```

## License
-This project is licensed under the ISC License.