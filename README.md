# Master

## Description
This Repository contains software recources relating the master thesis "Function and performance comparison of E2E testing frameworks in automated test
pipelines for web applications". More informating relating functionallity and design can be found the PDF "Function_and_performance_comparison_of_E2E_testing_frameworks_in_the_field_of_automated_test_pipelines_for_web_applications.pdf".

## Prerequisites
- Docker Desktop

Docker Desktop is an application for MacOS, Linux, and Windows machines for the building and sharing of containerized applications and microservices.   

- https://www.docker.com/products/docker-desktop/
- https://docs.docker.com/desktop/

Editor recommendation VSCode.

## Authors
Pascal Fitzner

## License

MIT License

Copyright (c) 2022 Pascal Fitzner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Run Containers

## Run containers with database server only

> **Note**
> Running web application is only functioning in the main branche for user interaction, as the ports have to be adjusted in all other branches to access the restful API inside the container network, while using the automated setup. Vice versa the end to end test would not work from inside the container network, when using the main branche.


Run all three docker container frontend, backend and mongodb with command:
```
docker compose -f docker-compose.dev.yml up
```
Command needs to be executed in root directory of the project!

In case the docker-compose doesn't create container network on its own, following issue can be printed:
`network custom_application_network declared as external, but could not be found`

In this case running this command should resolve the issue:
```
docker network create custom_application_network
```

The docker-compose.dev file only starts the database server from the beginning, the vite server used for the frontend and the node server used for the backend have to be started manually. If the servers want to be started afterwards, this must be done via the 'docker exec -it <container_id> "\<command>"' command or with the coresponding terminals of the associated containers in the docker desktop.


For backend run:
```
yarn start
```
URL for backend 'http://localhost:3000/'

For frontend run:
```
yarn dev
```
URL for frontend 'http://localhost:8080/'

If make changes i recommend to use the '--build' option to run the containers.
```
docker compose -f docker-compose.dev.yml up --build
```

## Run containers with all servers 

> **Note**
> Running web application is only functioning in the main branche for user interaction, as the ports have to be adjusted in all other branches to access the restful API inside the container network, while using the automated setup. Vice versa the end to end test would not work from inside the container network, when using the main branche.


Run all three docker container frontend, backend and mongodb in addition to web servers and database servers with command:
```
docker compose -f docker-compose.yml up
```
Command needs to be executed in root directory of the project!

If make changes i recommend to use the '--build' option to run the containers.
```
docker compose -f docker-compose.yml up --build
```
Command needs to be executed in root directory of the project!

In case the docker-compose doesn't create container network on its own, following issue can be printed:
`network custom_application_network declared as external, but could not be found`

In this case running this command should resolve the issue:
```
docker network create custom_application_network
```

URL for backend 'http://localhost:3000/'

URL for frontend 'http://localhost:8080/'

# Tests

## Running manual End-to-End Tests

> **Note**
> Interacting with the web application is not possible with any of the test branches, as the ports have to be adjusted in all test branches to access the restful API inside the container network. Vice versa the end to end test would not work from inside the container network, when using the main branche. When you want to interact with test application you must use the main branche.


Running test needs to be done in the frontend container, while all web and database servers are running, with 'docker exec -it <frontend_container_id> "\<command>"' command or with the frontend container terminal in the docker desktop.

```
yarn test
```

## Running automated End-to-End Tests
For automated tests are Runners required. I recommend to use a local runner, as the gitlab-ci file requires the docker in docker service, which needs elevated privileges.
Runners are processes that pick up and execute CI/CD jobs for GitLab. 
How to setup gitlab runners?

- https://docs.gitlab.com/runner/install/index.html
- https://docs.gitlab.com/runner/install/windows.html
- https://docs.gitlab.com/runner/install/linux-repository.html

Problem with shared runners, no access to the config.toml set elevated privileges (Tested with university's shared runner 'mygit-runner01', couldn't start dind service!)


# File Structure
Following visualizes project file structure of the procurement app.

Master

├── backend

│   ├── app

│   │   ├── @types

│   │   │   └── express

│   │   │       └── index.d.ts

│   │   ├── controller.ts

│   │   ├── db.ts

│   │   ├── middleware.ts

│   │   ├── router.ts

│   │   ├── schema.ts

│   │   └── server.ts

│   ├── .dockerignore

│   ├── Dockerfile

│   ├── Dockerfile.dev

│   ├── package.json

│   ├── tsconfig.json

│   └── yarn.lock

├── frontend

│   ├── public

│   │   └── vite.svg

│   ├── src

│   │   ├── assets

│   │   │   └── blank-profile-picture.webp

│   │   ├── components

│   │   │   ├── ProfileComponent.vue

│   │   │   ├── SignInComponent.vue

│   │   │   └── SignUpComponent.vue

│   │   ├── pages

│   │   │   ├── Error.vue

│   │   │   ├── Profile.vue

│   │   │   ├── Signin.vue

│   │   │   └── Signup.vue

│   │   ├── router

│   │   │   └── index.ts

│   │   ├── store

│   │   │   ├── index.ts

│   │   │   └── types.ts

│   │   ├── App.vue

│   │   ├── main.ts

│   │   ├── style.css

│   │   └── vite-env.d.ts

│   ├── .dockerignore

│   ├── Dockerfile

│   ├── Dockerfile.dev

│   ├── index.html

│   ├── package.json

│   ├── README.

│   ├── tsconfig.json

│   ├── tsconfig.node.json

│   ├── vite.config.ts

│   ├── yarn-error.log

│   └── yarn.lock

├── .gitignore

├── .gitlab-ci.yml

├── docker-compose.dev.yml

├── docker-compose.yml

├── Function_and_performance_comparison_of_E2E_testing_frameworks_in_the_field_of_automated_test_pipelines_for_web_applications.pdf

└── README.md


