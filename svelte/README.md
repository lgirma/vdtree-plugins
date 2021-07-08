# vdtree-svelte

Svelte wrapper component for [vdtree](https://github.com/lgirma/vdtree) abstract components.

## Installation

Using npm:

```
npm i vdtree-svelte
```

## Usage

You can use the abstract DOM in a svelte component using `SvelteWrapper` import

```jsx
<script>
    import SvelteWrapper from 'vdtree-svelte'
    import {h} from 'vdtree'

    let myDom = h('div', {}, 'Hello, World!')
</script>

<SvelteWrapper dom={myDom}/>
```

You can also use an abstract component inside the svelte component.
A simple counter example:

```jsx
// CounterInfo.jsx
/** @jsx h */
import {h} from 'vdtree'

const AbstractCounterInfo = ({c = 1}) => <div>{c}</div>


// Counter.svelte
<script>
    let count = 0
</script>

<SvelteWrapper dom={AbstractCounterInfo} props={{c: count}} />
<button on:click={e => count = count+1}>+</button>
```

You can also use event handling as

```jsx
// MyComp.jsx
const MyComp = <button onclick={e => alert('Clicked!')}>Click Me</button>

// SvelteFile.svelte
<SvelteWrapper dom={MyComp}/>
```

**Note**: The `SvelteWrapper` component will always create a top-level `<div>` tag.