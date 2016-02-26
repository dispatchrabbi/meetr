# Run on top of an image that's got Node
FROM node:latest

# Set up where our app will live
ENV APPDIR /srv/meetr
RUN mkdir -p $APPDIR
WORKDIR $APPDIR

# Get dependencies set up
COPY package.json $APPDIR/package.json
RUN npm install
# Copy the app over
COPY . $APPDIR

# Expose the port we're serving the app out of
# TODO: Make this an env var
EXPOSE 8080

# Start the app, Kronk!
CMD [ "npm", "run", "dev" ]
