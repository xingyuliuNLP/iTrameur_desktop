# iTrameur Desktop

Ce projet a pour but de fournir à la communauté de TAL en France une version Desktop du logiciel [iTrameur](http://www.tal.univ-paris3.fr/trameur/iTrameur/).

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Développeurs

[Xiaoou WANG](xiaoouwang.githun.io)

[Xingyu LIU](https://github.com/xingyuliuNLP)

## Why

- The application using Electron that acts as a wrapper around the [iTrameur](http://www.tal.univ-paris3.fr/trameur/iTrameur/) website maintained by M. Serge Fleury. It contains the ability to quickly navigate to all parts of the website and save results that could be later read **offline**.
  
- Furthermore, the ressources (free accessed) used in our formation **T**raitement **A**utomatique des **L**angues will be integrated in this app by adding menu items. 
  
- Also for sharing my notes with *Talistes* or *Future Taliste* 


## Packaging the Application

Download all files in this repo and put them in a file -> change directory to the file

- The electron-packager tool can be globally installed for use in the CLI using the following command:
  
  `npm install electron-packager -g`
- The electron-packager has the following syntax:

```
electron-packager
    <sourcedir>
       <appname> --platform=<platform>
       --arch=<architecture> [optional flags...]
```
- The *platform* and *architecture* could be specified if one is developing for a certain platform. Running the packager specifying only the *sourcedir* and *appname* will produce a bundle that could only be run on the host platform/architecture:
  
`electron-packager . iTrameur`


## Features
- [x] Add save page offline function (2020-02-20)
- [ ] Add opening window. Buttons: iTameur, Quiz ...
- [ ] How to load [arbor.js](http://arborjs.org/)?
