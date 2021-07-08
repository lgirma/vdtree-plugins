import {renderToDom} from "./DOM";
import {SamplesPage} from "vdtree-examples";

const app = document.querySelector<HTMLDivElement>('#app')!

renderToDom(SamplesPage as any, app)
