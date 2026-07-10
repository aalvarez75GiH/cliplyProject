import { ScrollView, TouchableOpacity, View } from "react-native";
import styled, { css } from "styled-components/native";

const baseStyles = css`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "89%"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  background-color: ${(props) => props.color || "#FADADD"};
  flex-direction: ${(props) => props.direction || "column"};
  margin-top: ${(props) => props.margin_top || "0px"};
  margin-bottom: ${(props) => props.margin_bottom || "0px"};
  margin-right: ${(props) => props.margin_right || "0px"};
  margin-left: ${(props) => props.margin_left || "0px"};
  /* Correctly apply individual border radius properties */
  border-width: ${(props) => props.border_width || "0px"};
  border-color: ${(props) => props.border_color || "transparent"};
  border-style: ${(props) => props.border_style || "solid"};

  /* border-radius: ${(props) => props.border_radius || "0px"}; */

  border-top-left-radius: ${(props) =>
    props.border_radius_top_left || props.border_top_left_radius || "0px"};

  border-top-right-radius: ${(props) =>
    props.border_radius_top_right || props.border_top_right_radius || "0px"};

  border-bottom-left-radius: ${(props) =>
    props.border_radius_bottom_left ||
    props.border_bottom_left_radius ||
    "0px"};

  border-bottom-right-radius: ${(props) =>
    props.border_radius_bottom_right ||
    props.border_bottom_right_radius ||
    "0px"};
  overflow: ${(props) => props.overflow || "visible"};
`;

export const Container = styled(View).attrs((props) => ({}))`
  ${baseStyles};
`;

export const Action_Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})`
  ${baseStyles};
`;
export const Flexible_Container = styled(View)`
  ${baseStyles};
  flex: ${(props) => props.flex || 1};
`;

export const Action_Flex_Container = styled(TouchableOpacity)`
  ${baseStyles};
  flex: ${(props) => props.flex || 1};
`;

export const Scrollable_MainContent = styled(ScrollView).attrs((props) => ({
  contentContainerStyle: {
    justifyContent: props.justify || "center",
    alignItems: props.align || "center",
    flexGrow: 1,
  },
}))`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "89%"};
  background-color: ${(props) => props.color || "blue"};
`;

export const MainContent = styled(View)`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "89%"};
  justify-content: ${(props) => props.justify || "center"};
  align-items: ${(props) => props.align || "center"};
  background-color: ${(props) => props.color};
`;

export const Scrollable_Container = styled(ScrollView).attrs((props) => ({
  contentContainerStyle: {
    justifyContent: props.justify || "center",
    alignItems: props.align || "center",
    flexGrow: 1,
  },
}))`
  flex: 1;
  width: ${(props) => props.width || "100%"};
  /* height: ${(props) => props.height || "89%"}; */
  background-color: ${(props) => props.color || "white"};
`;

export const Flex_Container = styled(View)`
  flex: 1;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  background-color: ${(props) => props.color || "#FADADD"};
`;

const normalizeDimension = (value) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  // React Native accepts numbers directly.
  if (typeof value === "number") {
    return value;
  }

  // Keep percentages such as "100%".
  if (typeof value === "string" && value.includes("%")) {
    return value;
  }

  // Convert strings such as "64px" to 64.
  if (typeof value === "string" && value.endsWith("px")) {
    const parsedValue = Number.parseFloat(value);

    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  }

  return value;
};

export const Box = styled(View)((props) => ({
  width: normalizeDimension(props.width),
  height: normalizeDimension(props.height),

  minWidth: normalizeDimension(props.min_width),
  maxWidth: normalizeDimension(props.max_width),
  minHeight: normalizeDimension(props.min_height),
  maxHeight: normalizeDimension(props.max_height),

  flex: props.flex,
  flexGrow: props.flex_grow,
  flexShrink: props.flex_shrink,
  flexBasis: normalizeDimension(props.flex_basis),

  flexDirection: props.direction ?? "column",
  justifyContent: props.justify ?? "center",
  alignItems: props.align ?? "center",
  alignSelf: props.align_self,

  backgroundColor: props.color ?? "transparent",

  padding: normalizeDimension(props.padding),
  paddingTop: normalizeDimension(props.padding_top),
  paddingBottom: normalizeDimension(props.padding_bottom),
  paddingLeft: normalizeDimension(props.padding_left),
  paddingRight: normalizeDimension(props.padding_right),
  paddingHorizontal: normalizeDimension(props.padding_horizontal),
  paddingVertical: normalizeDimension(props.padding_vertical),

  margin: normalizeDimension(props.margin),
  marginTop: normalizeDimension(props.margin_top),
  marginBottom: normalizeDimension(props.margin_bottom),
  marginLeft: normalizeDimension(props.margin_left),
  marginRight: normalizeDimension(props.margin_right),
  marginHorizontal: normalizeDimension(props.margin_horizontal),
  marginVertical: normalizeDimension(props.margin_vertical),

  borderWidth: normalizeDimension(props.border_width) ?? 0,
  borderColor: props.border_color ?? "transparent",
  borderStyle: props.border_style ?? "solid",

  borderRadius: normalizeDimension(props.border_radius),

  borderTopLeftRadius: normalizeDimension(
    props.border_radius_top_left ?? props.border_top_left_radius
  ),

  borderTopRightRadius: normalizeDimension(
    props.border_radius_top_right ?? props.border_top_right_radius
  ),

  borderBottomLeftRadius: normalizeDimension(
    props.border_radius_bottom_left ?? props.border_bottom_left_radius
  ),

  borderBottomRightRadius: normalizeDimension(
    props.border_radius_bottom_right ?? props.border_bottom_right_radius
  ),

  overflow: props.overflow ?? "visible",

  position: props.position,
  top: normalizeDimension(props.top),
  bottom: normalizeDimension(props.bottom),
  left: normalizeDimension(props.left),
  right: normalizeDimension(props.right),

  zIndex: props.z_index,
  gap: normalizeDimension(props.gap),

  // etc...
}));
