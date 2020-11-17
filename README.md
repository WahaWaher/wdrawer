wDrawer <sup>1.0.3</sup>
-------
Navigation drawers provide access to destinations in your app.
Side sheets are surfaces containing supplementary content that are anchored to the left or right edge of the screen.

* Pure JS, UMD, ES5
* Has backdrop element
* Has page shifting mode

## Install:
```sh
# NPM
npm i wdrawer
# YARN
yarn add wdrawer
```

## Basic usage:
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/WahaWaher/wdrawer/dist/wdrawer.min.css">
  </head>
<body>
  
  <button class="app-drawer-switch">Drawer Switch</button>

  <div class="app-drawer" style="display:none">
    Drawer content...
  </div>
  
  <script src="https://cdn.jsdelivr.net/gh/WahaWaher/wdrawer/dist/wdrawer.umd.es5.min.js"></script>
  <script>
    window.addEventListener('load', function() {
    
      // Init
      const appDrawer = new WDrawer('.app-drawer', {
        // Options...
      });
    
      // Switch
      document.querySelector('.app-drawer-switch').addEventListener('click', function() {
        appDrawer.switch();
      });
    
    });
  </script>
</body>
</html>
```

## Options, Methods, Events:
```js
// Init
const appDrawer = new WDrawer('.app-drawer', {
  // Options...
});

// Default options:
const defaults = {
  width: 275, // drawer width, px
  position: 'right', // drawer appearing from "left" or "right"
  prefix: null, // prefix for main classes
  page: null, // selector of page content node or null if page shifting not used
  open: false, // initial state, true - open, false - close
};

// Properties
appDrawer.defaults; // default settings
appDrawer.nodes; // layout nodes
appDrawer.settings; // actual settings
appDrawer.state; // drawer state

// Methods
appDrawer.open();
appDrawer.close();
appDrawer.switch();

// Events:
document.querySelector('.app-drawer').addEventListener('wdrawer.open', (e) => {
  const instance = e.detail.instance;
  const { defaults, nodes, settings, state } = instance;
  
  console.log('Before drawer open', instance, defaults, nodes, settings, state);
});

document.querySelector('.app-drawer').addEventListener('wdrawer.close', (e) => {
  const instance = e.detail.instance;
  const { defaults, nodes, settings, state } = instance;
  
  console.log('Before drawer close', instance, defaults, nodes, settings, state);
});
```

## License (MIT)
Copyright (c) 2018-2020 Sergey Kravchenko

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
