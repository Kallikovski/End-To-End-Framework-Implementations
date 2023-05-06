# Create image from Dockerhub
FROM pascal00fitzner/master-thesis-frontend

RUN apt-get update && apt-get install -y chromium=108.0.5359.94

RUN apt-get update && apt-get install -y procps wget unzip xvfb libxi6 libgconf-2-4

RUN wget http://chromedriver.storage.googleapis.com/108.0.5359.71/chromedriver_linux64.zip

RUN unzip chromedriver_linux64.zip

RUN mv chromedriver /usr/bin/chromedriver 
RUN chown root:root /usr/bin/chromedriver 
RUN chmod +x /usr/bin/chromedriver 

# Create a directory where the app will be placed.
RUN mkdir -p /usr/src/frontend

# Change directory to run command in new directory
WORKDIR /usr/src/frontend

# Copy dependency definitions
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy code to run the app
COPY . /usr/src/frontend

# Expose port which the app runs on
# EXPOSE 8080

# Start dev server
