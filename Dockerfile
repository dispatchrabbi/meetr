# This is a Node app, so we'll start with a (specific version of a) Node image
FROM node:6.1.0

# Set up some environment variables
ENV APP_NAME=meetr APP_PORT=8080
ENV APP_HOME=/srv/$APP_NAME

# Create a user for the app to run as so it doesn't run as root
#   and create the APP_HOME directory if it doesn't already exist
#   and update npm (to a specific version)
RUN useradd --user-group --create-home --shell /bin/false $APP_NAME && \
  mkdir -p $APP_HOME
# This updating of NPM is currently commented out because of https://github.com/npm/npm/issues/9863
# RUN npm install --global npm@3.8.8
RUN npm -v

# Copy the package.json in first, because that's all we need to install dependencies
# TODO: also copy npm-shrinkwrap.json when there is one
# And then have the user we created take ownership, because Docker's COPY doesn't respect USER for ownership
COPY package.json $APP_HOME
RUN chown -R $APP_NAME:$APP_NAME $APP_HOME

# Tell Docker to use the user we created and the app's directory from now on
USER $APP_NAME
WORKDIR $APP_HOME

# Install the app('s node packages) as the user we created
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install && npm cache clean

# Copy the app's files into this image
# (We have to do this as root temporarily and then chown, because COPY doesn't respect USER for ownership)
USER root
COPY . $APP_HOME
RUN chown -R $APP_NAME:$APP_NAME $APP_HOME/*
USER $APP_NAME

# Expose the port we're serving the app out of
EXPOSE $APP_PORT

# Start the app, Kronk!
CMD npm rebuild node-sass && npm run dev
# CMD [ "npm", "run", "dev" ]
