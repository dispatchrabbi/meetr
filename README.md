# Meetr
It helps you figure out when everyone's free, but in a cool way. You can tell because there's no *e* before the *r*.

## Installing
Meetr relies on Docker to get it Node and MongoDB, so as long as you're rocking that Docker setup, all you have to do is:

```
$ git clone dispatchrabbi/meetr
$ cd meetr
$ docker-compose build
$ docker-compose up -d
```

> You may, occasionally, find that during the `docker-compose up -d` command, the container won't come up and will complain that it can't find the bindings for libsass. This is because libsass gets confused by Docker's union filesystem and can't figure out where its bindings are, even though they're *right there, goshdarnit*. You can fix this by adding `"predev": "env FORCE_SASS_BUILD=\"true\" npm rebuid node-sass"` to the package.json and running `docker-compose up` once, then hitting Ctrl+C to quit and removing the line. This forces the bindings to be built on the same layer as the app. You should be fine after. I recognize that this is super-duper wonky, and hopefully I can find a way in the future to mitigate this or do it automatically. ([Issue #9](https://github.com/dispatchrabbi/meetr/issues/9) is related to this.)

If you've got something else going on and you're gonna put your own MongoDB setup together, the environment variables you're looking for are in `config.js`. It *should* all work, but if it doesn't, feel free to make an issue.

### Direct access to MongoDB
You'll find the MongoDB daemon accessible to the CLI on port 27018 of your Docker container machine.

## Running
In a development environment, that `docker-compose up -d` ought to get you what you need.

In a production environment, theoretically all that needs to be done is to set the appropriate environment variables and do `npm run start`, but that is **not tested and may accidentally trigger [an apocalypse](https://s-media-cache-ak0.pinimg.com/236x/8b/8c/bc/8b8cbc2b14dce9e0ca25616e388575de.jpg)**. So... good luck?

## Testing
Easy-peasy, like it oughta be:

```
$ npm test
```

However, a lot of the stuff in here is provided for in the frameworks/modules I'm using, which have their own tests. Hopefully coverage tools will show you that I'm (eventually) testing all the code I'm responsible for.

## Contributing
If you decide to contribute to Meetr:

* keep to the style enforced by the ESLint config
* add appropriate tests to any PR
* we should be best friends.
