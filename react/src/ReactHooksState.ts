import {AbstractWritableState, StateSubscription, ValueBinding} from "vdtree";
import {isFunc, randomHash} from "boost-web-core";

export class ReactHooksState<T> extends AbstractWritableState<T> {
    $$hook: [T, Function]
    $$subscriptions = {}

    bind(expr: ((state: T) => any) | undefined, setter: ((state: AbstractWritableState<T>, newValue: any) => void) | undefined): ValueBinding<T> {
        return new ValueBinding<T>(this, expr, setter)
    }

    get(): T { return this.$$hook[0] }

    mutate(reducer: (prev: T) => void): void {
        let newState = {...this.$$hook[0]}
        reducer(newState)
        this.update(p => newState)
    }

    set(newVal: T): void {
        this.update(v => newVal)
    }

    subscribe(subscriber: any) {
        if (subscriber == null || !isFunc(subscriber))
            return ''
        let subscription = randomHash()
        this.$$subscriptions[subscription] = subscriber
        return subscription
    }

    unsubscribe(s: StateSubscription) {
    }

    update(reducer: (prev: T) => T): void {
        this.$$hook[1](reducer)
    }

    constructor(hooksState) {
        super();
        this.$$hook = hooksState
    }

}