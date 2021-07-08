<script lang="ts">
    //import {AbstractDomElement} from "./AbstractDOM";
    import {h,} from 'vdtree'
    import {renderToDom} from "vdtree-dom";
    import {isFunc} from "boost-web-core";
    import { onMount } from 'svelte';

    export let dom//: AbstractDomElement
    export let props = null
    let container;
    let mounted = false;
    let domInstance = null;

    onMount(() => {
        mounted = true;
    })

    $: {
        if (mounted) {
            let _dom = dom
            if (isFunc(dom))
                _dom = h(dom)
            if (props != null)
                _dom.props = props
            if (domInstance != null)
                domInstance.update(_dom)
            else
                domInstance = renderToDom(_dom, container)
        }
    }
</script>

<div bind:this={container}>
    <slot></slot>
</div>