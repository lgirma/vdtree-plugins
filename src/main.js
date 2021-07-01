import {h, withState} from 'vdtree'
import SW from './Component.svelte'

let AbsCounter = withState(0, count => h('div', {},
	h('div', {}, count.get()),
	h('button', {onclick: e => count.update(c => c + 1)}, '+')
))

const app = new SW({
	target: document.body,
	props: {
		dom: h(AbsCounter)
	}
});

export default app;