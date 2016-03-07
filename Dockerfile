# Run on top of an image that's got Node
FROM node:5

# Set up where our app will live
ENV APPDIR /srv/meetr
RUN mkdir -p $APPDIR
WORKDIR $APPDIR

# Get dependencies set up
COPY package.json $APPDIR/package.json
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm --unsafe-perm install

# Copy the app over
COPY . $APPDIR

# Expose the port we're serving the app out of
ENV PORT 8080
EXPOSE $PORT

# RUN [ "npm", "-v" ]
# RUN [ "node", "-v" ]
# RUN [ "node", "-p", "process.versions" ]
# RUN [ "node", "-p", "process.platform" ]
# RUN [ "node", "-p", "process.arch" ]
# RUN [ "npm", "install", "node-sass" ]
# RUN [ "cat", "/srv/meetr/node_modules/node-sass/package.json" ]
# RUN [ "/srv/meetr/node_modules/.bin/node-sass", "--version" ]
# RUN [ "node", "-p", "console.log(require('node-sass').info)" ]
# RUN [ "ls", "/srv/meetr/node_modules/node-sass/vendor" ]

# COPY ./bs/linux-x64-47_binding.node $APPDIR/node_modules/node-sass/vendor/linux-x64-47/binding.node

# RUN [ "/srv/meetr/node_modules/.bin/node-sass", "--version" ]
# RUN [ "node", "-p", "console.log(require('node-sass').info)" ]

# Start the app, Kronk!
CMD [ "npm", "run", "dev" ]
