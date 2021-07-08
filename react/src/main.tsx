import {ReactWrapper} from "./ReactWrapper";
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {SamplesPage} from "vdtree-examples";

const DemoPage = () => <ReactWrapper dom={SamplesPage} />

ReactDOM.render(<DemoPage />, document.getElementById('root')!)
