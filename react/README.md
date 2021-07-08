# vdtree-react

To render a static virtual DOM tree in a react component, use the `ReactWrapper` component.

```jsx
// AbstractHelloWorld.jsx
export const AbstractHelloWorld = <div>Hello, World!</div>

// ReactHelloWorld.jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ReactWrapper from "vdtree-react"

ReactDOM.render(<ReactWrapper dom={AbstractHelloWorld} />, document.body)
```

Use the `props` react prop to set properties in the abstract component. A greeter would look like:

```jsx
// AbstractGreeter.jsx
export const AbstractGreeter =
    ({name = ''}) => <div>Hello, {name}</div>

// ReactGreeter.jsx
import {AbstractGreeter} from './AbstractGreeter'
ReactDOM.render(<ReactWrapper dom={AbstractGreeter} props={{name: "React"}}/>, document.body)
```