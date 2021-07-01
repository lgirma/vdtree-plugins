/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte"
import type { AbstractDomNode } from "vdtree";

export interface SvelteWrapperProps {
    dom: AbstractDomNode
    props: any
}

export default class SvelteWrapper extends SvelteComponentTyped<SvelteWrapperProps> {}