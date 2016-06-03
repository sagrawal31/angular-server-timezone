# Angular Server Timezone (current v0.0.1)

A simple Angular module which will pass the timezone of user's browser to the every `$http` request. By default, it
sends the timezone in request header under the key `User-Time-Zone` (name can be changed) but you can change it to
pass as request parameter.

This library combines [bower-jstz](https://github.com/bower-packages/bower-jstz) for detecting the timezone. (You don't have to include it explicitly).

## Usage

### 1. Install via Bower

```shell
bower install angular-server-timezone --save
```

### 2. Add the script to your main HTML file (like index.html)

```html
<script src="bower_components/angular-server-timezone/dist/angular-server-timezone.min.js"></script>
```

### 3. Add dependency to your application

```javascript
var myApp = angular.module("foo", ["server.timezone", "other-foo-depenency"]);
```

Now, in each HTTP request to the server, you can see the user's current timezone is being sent.

![angular-server-timezone](https://cloud.githubusercontent.com/assets/1804514/15773242/85512776-2993-11e6-8b4f-750b55a90caa.png)

### 4. Customizations

By default, this module send the timezone in header with name `User-Time-Zone` which can be customized in your app's
config. Also, you can send the timezone as the request parameter instead of header or both where paramter name can
also be customized.

```javascript
amyApp.config(['serverTimeZoneConfigProvider', function (serverTimeZoneConfig) {

    serverTimeZoneConfig.sendAsHeader = true;              // Default
    serverTimeZoneConfig.headerName = 'fooTimeZone';        // Default to User-Time-Zone

    serverTimeZoneConfig.sendAsParameter = false;              // Default
    serverTimeZoneConfig.headerName = 'barTimeZone';        // Default to userTimeZone
}]);
```