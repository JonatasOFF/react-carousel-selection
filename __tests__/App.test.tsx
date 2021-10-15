

/**
 * @jest-environment jsdom
 */

import * as React from "react";
import App from "../src/App";
import { RenderComponent } from "../utils/render-component";

describe('App', function () {
    const app = new RenderComponent(<App />).getContainer()

    it('Can render App', () => {
        console.log(app.getElementsByClassName('body-application').length)
        expect(app).not.toBeNull();
    }); // Arruma a porra do SCSS ai cuzao

    it('Have class of test', () => {
        expect(app.getElementsByClassName('body-application').length).toBe(1)
    })
});