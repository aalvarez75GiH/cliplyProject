// import MenuIcon from "../../../assets/my-icons/two_stripes_menu.svg";
import { Text } from "../../infrastructure/typography/text.component.js";
import MenuIcon from "../../../assets/my-icons/menu_icon.svg";
import { Image } from "expo-image";

import {
  Container,
  Action_Container,
} from "../global_components/containers/general_containers.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Spacer } from "../global_components/optimized.spacer.component.js";

export const HomeHeader = ({ action }) => {
  return (
    <Container
      width="100%"
      height="8%"
      align="center"
      justify="space-between"
      direction="row"
      color={theme.colors.bg.elements_bg}
    >
      <Action_Container
        width="20%"
        height="100%"
        align="center"
        justify="center"
        color={theme.colors.bg.elements_bg}
        onPress={action}
      >
        <MenuIcon width={30} height={30} fill={"#000000"} />
      </Action_Container>
      <Container
        width="80%"
        height="100%"
        justify="center"
        align="flex-end"
        paddingRight="5%"
        color={theme.colors.bg.elements_bg}
        // color={"lightblue"}
      >
        <Spacer position="top" size="medium" />
        <Image
          source={require("../../../assets/illustrations/logos/header_logo_smaller.png")}
          style={{ width: 100, height: 65 }}
        />
      </Container>
    </Container>
  );
};
