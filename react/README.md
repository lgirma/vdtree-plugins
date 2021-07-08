# vdtree-react

To render a static virtual DOM tree in a react component, use the `toReactComponent()` method.

```jsx
// AbstractHelloWorld.jsx
export const AbstractHelloWorld = <div>Hello, World!</div>

// ReactHelloWorld.jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {toReactComponent} from "vdtree"

const ReactHelloWorld = toReactComponent(AbstractHelloWorld, React)

ReactDOM.render(<ReactHelloWorld/>, document.body)
```

Note that we had to pass `React` object as the second argument for `toReactComponent()` method.

A simple greeter example,

```jsx
// AbstractGreeter.jsx
export const AbstractGreeter =
    ({name = ''}) => <div>Hello, {name}</div>

// ReactGreeter.jsx
const ReactGreeter = toReactComponent(AbstractGreeter, React)
ReactDOM.render(<ReactGreeter name="React"/>, document.body)
```

Including React components in abstract components is also possible.
However, you will lose the ability of rendering the component to other targets.

```jsx
import {Button} from "@chakra-ui/react"

<div>
    <Button colorScheme="blue">Click Me</Button>
</div>
```