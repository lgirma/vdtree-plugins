import {toReactComponent} from "./ReactWrapper";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
    SamplesPage
} from "vdtree-examples";

let DemoPage = toReactComponent<React.ReactElement>(SamplesPage as any, React)

ReactDOM.render(<DemoPage />, document.getElementById('root')!)
