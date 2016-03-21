# Meetr
It helps you figure out when everyone's free, but in a cool way. You can tell because there's no *e* before the *r*.

## Installing
Right now, Meetr is all about that Docker setup, so for right now, that's what I'm documenting. If you've got something else going on and you're gonna put your own MongoDB setup together, the environment variables you're looking for are in `config.js`.

For now, here's how you get it up and running:

```
$ git clone dispatchrabbi/meetr
$ cd meetr
$ docker-compose build
$ docker-compose up -d
```

> You may, occasionally, find that during the `docker-compose up -d` command, the container won't come up and will complain that it can't find the bindings for libsass. This is because libsass gets confused by Docker's union filesystem and can't figure out where its bindings are, even though they're *right there, goshdarnit*. You can fix this by adding `"predev": "env FORCE_SASS_BUILD=\"true\" npm rebuid node-sass"` to the package.json and running `docker-compose up` once, then hitting Ctrl+C to quit and removing the line. This forces the bindings to be built on the same volume layer as the app. You should be fine after. Hopefully I can find a way in the future to mitigate this or do it automatically.

You'll find the MongoDB daemon accessible to the CLI on port 27018 of your Docker container machine.

Better instructions will be up as soon as there's more here to work with. Sorry about the mess.
