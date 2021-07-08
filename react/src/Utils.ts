import {ValueBinding} from "vdtree";
import {kebabToCamelCase} from "boost-web-core";

export function htmlAttrsToReactAttrs(htmlAttrs: any) {
    let result: any = {}
    for (const k of Object.keys(htmlAttrs)) {
        const v = htmlAttrs[k]
        if (k === 'class') result.className = v
        // binding expressions:
        else if (v instanceof ValueBinding) {
            let stateVal = v.get(v.state.get())
            let bindingEL = e => v.set(v.state, e.target.type == 'checkbox' ? e.target.checked : e.target.value)
            if (k == 'checked') {
                result.checked = !!stateVal
            }
            else if (k == 'value') {
                result.value = stateVal
            }
            else {
                result[k] = stateVal
                console.warn('vdiff: Binding to non-value attribute ' + k)
            }
            result.onChange = bindingEL
        }
        else if (k == 'style' && typeof v == 'string') {
            result.style = styleToObject(v)
        }
        else if (k == 'for') result.htmlFor = v
        else if (k == 'value') result.defaultValue = v
        else if (k == 'checked') result.defaultChecked = v
        // Events:
        else if (typeof(v) == 'function' && k.length > 3) {
            result[`on${k[2].toUpperCase()}${k.slice(3)}`] = v
        }
        else result[k] = v
    }
    return result
}



const styleToObject = (style: string): any => style.split(';').filter(s => s.length)
    .reduce((a, b) => {
        const keyValue = b.split(':');
        a[kebabToCamelCase(keyValue[0]).trim()] = keyValue[1].trim();
        return a;
    }, {} as any);