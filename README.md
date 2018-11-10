# web-orm
> An ORM that works over Web 💪

# WORK IN PROGRESS

This library is not yet ready for usage. So please save this page to bookmarks or [give it a star on GitHub](https://github.com/KazanExpress/web-orm) and come here later! 😊

## What is it?

ORM (Object-relational mapper) - a programming tool for converting data between incompatible type systems using object-oriented paradigms. It often reduces the amount of code that needs to be written in order to access the needed data.

[Many ORMs](https://github.com/search?q=ORM) exist for back-end data storages and browsers, but yet no real ORM exists to connect them. That's why `web-orm` was created.

## Why ORM over web?

It would be so big, cumbersome, redundant and inefficient, right?

**WRONG**

Modern web browsers support a couple of database solutions already like IndexedDB or WebSQL. There also exist some libraries that simplify working with these databases. But the pain only begins here: once you have your IndexedDB/WebSQL set up, you also need to polyfill them with localStorage (for older browsers) and make a universal API for your app out of all this while keeping all the data up-to-date with the data you have on your server. Quite a few things to keep track of, huh?

That is exactly the problem `web-orm` aims to solve.

So instead of reinventing the wheel each time you need a reliable and sufficient storage for your web application - just use `web-orm`!

Part of the cool stuff is that `web-orm` can also keep your data fresh for you, getting it from your servers right when you need it. You only need to map your CRUD request templates onto your data!
