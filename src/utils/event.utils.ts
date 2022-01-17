import React from "react";

export const isMouseEvent = (
  event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
): event is MouseEvent | React.MouseEvent =>
  (event as MouseEvent | React.MouseEvent).clientX != null;

export const preventDefault = (event: Event | React.UIEvent): void => {
  event.preventDefault();
};
