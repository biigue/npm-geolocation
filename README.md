# npm-geolocation
## This repository implements the solution for taking phones from api.

### 1. How to import
1. Use in gulp
```javascript
gulp.task("geolocation", function () {
  gulp.src('./node_modules/npm-geolocation/index.js')
    .pipe(gulp.dest("dist/"));
});
```

```html
<script async src="./node_modules/npm-geolocation/index.js"></script>
```

2. Or any other...

### 2. How to use

1. Send Url and Name/Brand
```javascript
const x = new GeolocationPhone(url, 'name');
```
this change the .header__phone for the formated Phone and .header__phone_link for 'tel:number'.

2. If you need the whatsapp number use:
```javascript
var wpp = new getWhats();


```
