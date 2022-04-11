import * as React from "react";
import * as ReactDOM from "react-dom";
import { H5PWidget } from "h5p-utils/src/models/H5PWidget";
import { H5PFieldGroup, IH5PWidget } from "h5p-types";
import { App } from "../App";
import { Params } from "../types/Params";

export class H5PWrapper
  extends H5PWidget<H5PFieldGroup, Params>
  implements IH5PWidget
{
  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-editor-topic-map` to.",
      );
      return;
    }

    const { setValue, field, params, parent } = this;

    ReactDOM.render(
      <App
        setValue={newParams => setValue(field, newParams)}
        semantics={field}
        initialParams={params}
        parent={parent}
      />,
      this.wrapper,
    );

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-topic-map");
  }

  validate(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(): void {}
}
