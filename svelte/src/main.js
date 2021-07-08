import {h, withState} from 'vdtree'
import {SamplesPage} from "vdtree-examples";
import SW from './Component.svelte'

const app = new SW({
	target: document.body,
	props: {
		dom: SamplesPage
	}
});

export default app;