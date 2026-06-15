import React from "react";
import Svg, { G, Path } from "react-native-svg";

export const ExitIcon = ({ fill = "#000000", size = 18 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 12.7 12.7"
    xmlns="http://www.w3.org/2000/svg"
  >
    <G>
      <Path
        d="M1.066.53a.527.527 0 0 0-.377.907L5.602 6.35.689 11.263a.53.53 0 1 0 .748.749L6.35 7.099l4.913 4.913a.53.53 0 1 0 .748-.75L7.098 6.35l4.913-4.913a.53.53 0 1 0-.748-.749L6.35 5.601 1.437.688A.527.527 0 0 0 1.066.53z"
        fill={fill}
      />
    </G>
  </Svg>
);
