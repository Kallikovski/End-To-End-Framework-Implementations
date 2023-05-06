# Create image from Dockerhub
FROM pascal00fitzner/master-thesis-frontend

RUN apt-get update && apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb procps

# RUN apt-get update && apt-get install -y chromium

# Create a directory where the app will be placed.
RUN mkdir -p /usr/src/frontend

# Change directory to run command in new directory
WORKDIR /usr/src/frontend

# Copy dependency definitions
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn add cypress
RUN yarn install

# Copy code to run the app
COPY . /usr/src/frontend

# Expose port which the app runs on
# EXPOSE 8080

# Start dev server