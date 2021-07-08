# vdtree-ssr

To get an HTML string from an abstract dom tree,

```jsx
import {toHtmlString, h} from "vdtree"

const htmlString = toHtmlString(
    <div>Hello, World!</div>
)
```

Multiple top-level elements can also be used as

```javascript
toHtmlString([
    h('div', {}, 'Item 1'),
    h('div', {}, 'Item 2'),
])
```

which will output:

```html
<div>Item 1</div>
<div>Item 2</div>
```