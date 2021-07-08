/** @jsx h */
import express from 'express';
import {toHtmlString} from "./SSR";
import {SamplesPage} from "vdtree-examples";
import {h, withState} from 'vdtree'

const app = express()
let port = 8585

app.get('/', (req, res) => {
    res.send(toHtmlString(SamplesPage))
})

app.listen(port, () => {
    console.log(`SSR sample app listening at http://localhost:${port}`)
})