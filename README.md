repowatch
=========

Repository (GIT, SVN, etc.) live change and diff notification service

Purpose
=======

Repowatch is going to be designed to be installed on each developer's machine:

1. Install `repowatch` on a developer's local machine as a global command
2. Developers use the global command (e.g. `repowatch ~/myproject`) to watch every file in their local file system
3. When any developer changes a local file on his/her machine, repowatch will update a mongo database collection for that repo marking that file as "being edited" and contain any metadata that could be useful.
4. Repowatch will simultaneously watch the mongodb for changes by other developers and provide a notification service (JSON, sockets, etc.) that tells the current state of every user's local machine

This service will provide a way to see the instantaneous state of the repository on every developer's machine and notify of any potential merge conflicts before they occur. It will also provide ways to integrate plugins that can do things like watching for formatting issues, code standards issues, etc.
