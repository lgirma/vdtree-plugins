# vdtree-dom

Render vdtree components to the browser DOM without any framework.

## Installation

Using npm:

```shell
npm i vdtree-dom
```

## Usage

Use

* `renderToDom()` method to render an abstract component to DOM
* `toDomElement()` method to create a DOM element from abstract component

```jsx
/** @jsx h */
import {toDomElement, h} from 'vdtree'

const abstractElt = <div>Hello, World!</div>
document.body.append(toDomElement(abstractElt))
```

If you want to render multiple root-level elements, use `toDom`

```javascript
const abstractElts = [
    <div>Element 1</div>,
    <div>Element 3</div>
]
document.body.append(...toDom(abstractElts))
```

To enable watch and update on the DOM when values change, use `renderToDom()` method

```javascript
// First time render
const watch = renderToDom(
    <Comp prop={propVal}/>, targetElement
)

// Anytime you want to re-render the component:
watch.update(
    <Comp prop={newVal}/>
)

// To update only attributes:
watch.newProps(newAttrs)
//or
watch.newProps(prevAttrs => ({...prevAttrs, someProp: newVal}))
```

Rather than doing a complete replacement, it will patch the changes efficiently.