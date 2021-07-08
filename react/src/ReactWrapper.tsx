import {
    AbstractDomNode, AbstractDomNodeWithState
} from "vdtree";
import {isFunc, OneOrMany, toArray} from "boost-web-core";
import {htmlAttrsToReactAttrs} from "./Utils";
import {ReactHooksState} from "./ReactHooksState";
import {ReactElement} from "react";

export function toReactComponent<TElement = ReactElement, TProps = any>(item: AbstractDomNode, React: any): (props: TProps) => TElement {
    const {createElement, Fragment} = React

    if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean' || typeof item == 'bigint') {
        return () => createElement('span', null, item)
    }
    else if (item instanceof AbstractDomNodeWithState) {
        return toStatefulComponent(item, React)
    }
    else if (item.tag instanceof AbstractDomNodeWithState) {
        return toStatefulComponent(item.tag, React)
    }
    else if (isFunc(item)) {
        // AFC
        return (props) => toReactElement((item as any)(props), React)
    }
    else {
        return () => toReactElement(item, React)
    }
}

export function toReactElement<TElement = ReactElement>(root: OneOrMany<AbstractDomNode>, React: any): TElement {
    const {Fragment, createElement} = React
    let result = toReactElements(root, React)
    if (result.length > 1)
        return createElement(Fragment, null, ...result)
    else if (result.length == 1)
        return result[0] as any
    console.warn('Cannot render empty React element', root)
    return createElement('span')
}

function toStatefulComponent<TElement = ReactElement>(comp: AbstractDomNodeWithState, React: any) {
    const {useState} = React
    return function (props) {
        const hook = useState(comp.basedOn)
        const stateWrapper = new ReactHooksState(hook)
        let virDomTree = comp.stateMapping(stateWrapper)
        return toReactElement<TElement>(virDomTree, React)
    }
}

export function toReactElements<TElement = ReactElement>(root: OneOrMany<AbstractDomNode>, React: any): TElement[] {
    const {createElement} = React
    let reactElements: any[] = []
    let roots = toArray(root)

    for (const item of roots) {
        if (typeof item == 'string' || typeof item == 'number' || typeof item == 'boolean' || typeof item == 'bigint') {
            reactElements.push(item)
        }
        else if (item instanceof AbstractDomNodeWithState) {
            reactElements.push(createElement(toStatefulComponent(item, React)))
        }
        else if (item.tag instanceof AbstractDomNodeWithState) {
            reactElements.push(createElement(toStatefulComponent(item.tag, React), item.props, item.children))
        }
        else if (isFunc(item.tag)) {
            let rendered = (item.tag as any)(item.props ?? {})
            if (rendered.type === undefined)
                reactElements.push(toReactElements(rendered, React))
            else
                reactElements.push(createElement(item.tag, item.props, item.children))
        }
        else if (item.tag?.prototype instanceof React.Component) {
            reactElements.push(createElement(item.tag, item.props, item.children))
        }
        else if (typeof item.tag == 'string') {
            let reactAttrs = htmlAttrsToReactAttrs({...item.props})
            let elt = item.tag == 'textarea'
                ? createElement(item.tag, {...reactAttrs, defaultValue: item.children})
                : createElement(item.tag, reactAttrs, ...toReactElements(item.children, React))
            reactElements.push(elt)
        }
        else {
            console.error('vdtree: Unable to convert element to React element', item)
        }
    }

    return reactElements
}