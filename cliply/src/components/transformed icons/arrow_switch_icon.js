import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowSwitchIcon = ({ fill, size = 30 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={"none"}>
    <Path
      d="M8 7L20 7M20 7L16 3M20 7L16 11M16 17L4 17M4 17L8 21M4 17L8 13"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// const EnvelopeIcon = ({ fill = "#FAD", size = 40 }) => (
//   <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
//     <G transform="translate(78, 232)">
//       <Path
//         d="M8 7L20 7M20 7L16 3M20 7L16 11M16 17L4 17M4 17L8 21M4 17L8 13"
//         fill={fill}
//       />
//       <Path
//         d="M8 7L20 7M20 7L16 3M20 7L16 11M16 17L4 17M4 17L8 21M4 17L8 13"
//         fill={fill}
//       />
//     </G>
//   </Svg>
// );
export default ArrowSwitchIcon;
