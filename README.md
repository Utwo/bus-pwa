# Cluj Bus
#### [Live demo](https://buscluj.netlify.com/)

A simple bus schedule pwa app made in Vue.
This app lets you to:
  * find schedule and route information about buses in Cluj-Napoca
  * add bus lines to favorites
  * use the app offline

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Backend JSON data
This project make use of [CTP CJ Scrapper](https://github.com/Utwo/ctpcj-scrapper), 
a great node utility that scrap [ctp website](http://ctpcj.ro/) and 
save bus lines and route information to json file  

Clone that open source project to generate real data.

## Todo
- [ ] Update to Vuetify 2 (set tag attribute to each component)
- [ ] Prerender
- [ ] Change $color-pack to false
- [ ] Choose better colors
- [ ] Put typescript (only when available in cli typescript template)

## Credits
Loading animation from:
https://codepen.io/andersschmidt/pen/NPVPYP
