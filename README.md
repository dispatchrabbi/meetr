# Meetr
It helps you figure out when everyone's free, but in a cool way. You can tell it's cool because there's no *e* before the *r*.

## Installing
Meetr relies on Docker to get it Node and MongoDB, so as long as you're rocking that Docker setup, all you have to do is:

```
$ git clone dispatchrabbi/meetr
$ cd meetr
$ env FORCE_SASS_BUILD=\"true\" docker-compose build
$ docker-compose up -d
```

> I'm using the Docker native setup on OS X, which is all that this is tested on so far. Hope it works in other places too!

The `FORCE_SASS_BUILD` environment variable is only there to force node-sass to build/download bindings from inside the container. It's funky and I'm not a huge fan, but it works for now.

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
