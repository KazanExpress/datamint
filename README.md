<h1 align="center">
  <img style="object-fit:cover" src="logo/logo-color-text.svg" alt="datamint">
</h1>

<p align="center">
  Dynamically reFresh your data 🍬
<p>

# WORK IN PROGRESS

This library is not yet ready for usage. So please save this page to bookmarks or [give it a star on GitHub](https://github.com/KazanExpress/datamint) and come here later! 😊

## What is it?

**DATAMINT** is a type of ORM.

ORM (Object-relational mapper) - a programming tool for converting data between incompatible type systems using object-oriented paradigms. It often reduces the amount of code that needs to be written in order to access the needed data.

[Many ORMs](https://github.com/search?q=ORM) exist for back-end data storages and browsers, but yet no real ORM exists to connect them. That's why `datamint` was created.

## Why ORM over web?

It would be so big, cumbersome, redundant and inefficient, right?

Not necessarily.

Modern web browsers support a couple of database solutions already like IndexedDB or WebSQL. There also exist some libraries that simplify working with these databases. But the pain only begins here: once you have your IndexedDB/WebSQL set up, you also need to polyfill them with localStorage (for older browsers) and make a universal API for your app out of all this while keeping all the data up-to-date with the data you have on your server. Quite a few things to keep track of, huh?

That is exactly the problem `datamint` aims to solve in just under 10 kilobytes.

This means that with `datamint` you can simply map your api client requests (using [kefetchup](https://github.com/KazanExpress/kefetchup), for example) onto your own data-types without and then forget about the fact that your project even uses back-end APIs!

And also...

`datamint` supports tree-shaking!

## [Documentation](https://github.com/KazanExpress/datamint/wiki)

See project's [wiki](https://github.com/KazanExpress/datamint/wiki).
