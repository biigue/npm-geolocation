# npm-geolocation
## This repository implements the solution for taking phones from api.

### 0. Depences
    $ npm i -D jquery

### 1. How to import
1. Use in gulp

```javascript
gulp.task("geolocation", function () {
  gulp.src('./node_modules/npm-geolocation/dist/index.min.js')
    .pepe(gulp.concat('geolocation.js'))
    .pipe(gulp.dest("dist/");
});
```

2. Or any other...

### 2. How to use

1. Instance new object: `This change the .header__phone for the formated Phone and .header__phone_link for 'tel:number'.`
```javascript
const url = '...';
const geolocation = new GeolocationInfos(url, 'name');
```

2. If you need the whatsapp number use:
```javascript
const whatsapp = geolocation.whatsapp;
```
