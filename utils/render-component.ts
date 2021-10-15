
import { act } from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";


export class RenderComponent {
    private readonly container: HTMLDivElement;

    constructor(element: any) {
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
        ReactDOM.render(element, this.container)
        act(() => {
            ReactDOM.render(element, this.container);
        })
    }

    getContainer(): HTMLDivElement { return this.container; }




}