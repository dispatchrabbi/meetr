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

# Start the app, Kronk!
CMD [ "npm", "run", "dev" ]
