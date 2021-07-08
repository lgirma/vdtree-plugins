import {
    AbstractDomNode, AbstractDomNodeWithState
} from "vdtree";
import {isFunc, OneOrMany, toArray} from "boost-web-core";
import {htmlAttrsToReactAttrs} from "./Utils";
import {ReactHooksState} from "./ReactHooksState";
import {ReactElement, createElement, Fragment, useState, Component, FC} from "react";

export interface ReactWrapperProps<TProps = any> {
    dom: AbstractDomNode|((p: TProps) => AbstractDomNode)
    props?: TProps
}

export function ReactWrapper<TProps = {}>({dom, props}: ReactWrapperProps<TProps>) {
    const Comp = toReactComponent<TProps>(dom as any)
    return createElement(Comp, props)
}

export function toReactComponent<TProps = any>(item: AbstractDomNode): FC<TProps> {

    if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean' || typeof item == 'bigint') {
        return () => createElement('span', null, item)
    }
    else if (item instanceof AbstractDomNodeWithState) {
        return toStatefulComponent(item)
    }
    else if (item.tag instanceof AbstractDomNodeWithState) {
        return toStatefulComponent(item.tag)
    }
    else if (isFunc(item)) {
        // AFC
        return (props) => toReactElement((item as any)(props))
    }
    else {
        return () => toReactElement(item)
    }
}

export function toReactElement(root: OneOrMany<AbstractDomNode>): ReactElement {
    let result = toReactElements(root)
    if (result.length > 1)
        return createElement(Fragment, null, ...result)
    else if (result.length == 1)
        return result[0] as any
    console.warn('Cannot render empty React element', root)
    return createElement('span')
}

function toStatefulComponent(comp: AbstractDomNodeWithState) {
    return function (props) {
        const hook = useState(comp.basedOn)
        const stateWrapper = new ReactHooksState(hook)
        let virDomTree = comp.stateMapping(stateWrapper)
        return toReactElement(virDomTree)
    }
}

export function toReactElements(root: OneOrMany<AbstractDomNode>): ReactElement[] {
    let reactElements: any[] = []
    let roots = toArray(root)

    for (const item of roots) {
        if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean' || typeof item == 'bigint') {
            reactElements.push(item)
        }
        else if (item instanceof AbstractDomNodeWithState) {
            reactElements.push(createElement(toStatefulComponent(item)))
        }
        else if (item.tag instanceof AbstractDomNodeWithState) {
            reactElements.push(createElement(toStatefulComponent(item.tag), item.props, item.children))
        }
        else if (isFunc(item.tag)) {
            let rendered = (item.tag as any)(item.props ?? {})
            if (rendered.type === undefined)
                reactElements.push(toReactElements(rendered))
            else
                reactElements.push(createElement(item.tag, item.props, item.children))
        }
        else if (item.tag?.prototype instanceof Component) {
            reactElements.push(createElement(item.tag, item.props, item.children))
        }
        else if (typeof item.tag == 'string') {
            let reactAttrs = htmlAttrsToReactAttrs({...item.props})
            let elt = item.tag == 'textarea'
                ? createElement(item.tag, {...reactAttrs, defaultValue: item.children})
                : createElement(item.tag, reactAttrs, ...toReactElements(item.children))
            reactElements.push(elt)
        }
        else {
            console.error('vdtree: Unable to convert element to React element', item)
        }
    }

    return reactElements
}