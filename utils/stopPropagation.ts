import React from "react";

export const stopPropagation = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  //stop propagation
  e.stopPropagation();
};
