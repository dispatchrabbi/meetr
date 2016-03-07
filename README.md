# Meetr
It helps you figure out when everyone's free, but in a cool way. You can tell because there's no *e* before the *r*.

## Installing
Right now, Meetr is all about that Docker setup, so for right now, that's what I'm documenting. If you've got something else going on and you're gonna put your own MongoDB setup together, the environment variables you're looking for are in `config.js`.

For now, here's how you get it up and running:

```
$ git clone dispatchrabbi/meetr
$ cd meetr
$ docker-compose up -d
```

You'll find the MongoDB daemon accessible to the CLI on port 27018 of your Docker container machine.

Better instructions will be up as soon as there's more here to work with. Sorry about the mess.
