import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { SafeArea } from "../../components/global_components/safe-area.component.js";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../../components/global_components/containers/general_containers.js";
import { Spacer } from "../../components/global_components/optimized.spacer.component.js";
import { Uploading_text_clip_Tile } from "../../components/tiles/uploading_text_clip.tile.js";
import CloudIcon from "../../../assets/my-icons/cloud_1.svg";
import { Loading_Spinner_area } from "../../components/global_components/global_loading_spinner_area.component.js";
import { Regular_With_Icon_CTA } from "../../components/calls_to_action/regular_with_icon.cta.js";
import { Regular_CTA } from "../../components/calls_to_action/regular.cta.js";
import { Button_Go_Back_Header } from "../../components/headers/button_go_back_header.js";
import { Snack_Bar_Component } from "../../components/others/snack_bar.component.js";

import { VoiceRecentClipsContext } from "../../infrastructure/services/voice_recents/voice_recent.context.js";
import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export default function Uploading_Message_View({ navigation, route }) {
  const {
    textClip_data_to_upload,
    posting_new_text_clip_to_upload,
    isLoading,
  } = useContext(VoiceRecentClipsContext);
  const { operation_label, status_label } = route.params;

  const { snackbar, showSuccessSnackbar, hideSnackbar } =
    useContext(GlobalContext);

  const action_after_posting = async (textClip_data_to_upload) => {
    const response_status = await posting_new_text_clip_to_upload(
      textClip_data_to_upload
    );
    if (response_status === 201) {
      const onAction = () => {
        hideSnackbar();

        requestAnimationFrame(() => {
          navigation.popToTop();
        });
      };
      showSuccessSnackbar("Message saved successfully!", onAction);
    }
  };
  return (
    <SafeArea background_color={theme.colors.bg.elements_bg}>
      <Container
        width="100%"
        height={"100%"}
        color={theme.colors.bg.screens_bg}
        justify="center"
        align="center"
      >
        <Button_Go_Back_Header
          action={() => navigation.goBack()}
          caption="Back"
        />
        {/* {isLoading && <Loading_Spinner_area />} */}
        {/* {!isLoading && ( */}
        <>
          <Container
            width={"100%"}
            height={"55%"}
            color={theme.colors.bg.screens_bg}
            // color={"lightblue"}
            align="center"
            justify="center"
          >
            <Uploading_text_clip_Tile
              textClip_data_to_upload={textClip_data_to_upload}
              operation_label={operation_label}
              status_label={status_label}
            />
          </Container>
          <Container
            width={"100%"}
            height={"40%"}
            justify="flex-start"
            align="center"
            direction="column"
            color={theme.colors.bg.screens_bg}
          >
            <Regular_With_Icon_CTA
              // action={null}
              action={() => action_after_posting(textClip_data_to_upload)}
              label={"Save"}
              width="95%"
              height={"17%"}
              color={theme.colors.ui.primary}
              text_variant={"dm_sans_bold_16_white"}
              Icon={<CloudIcon width={35} height={35} fill={"white"} />}
            />

            <Spacer position="top" size="medium" />
            <Regular_CTA
              width="95%"
              height="17%"
              color="transparent"
              caption="Exit"
              caption_variant="dm_sans_bold_16"
              action={() => navigation.goBack()}
            />
          </Container>
        </>
        {/* )} */}
      </Container>
      {isLoading && (
        <Container
          width="100%"
          height="100%"
          color={theme.colors.bg.screens_bg}
          justify="center"
          align="center"
          style={styles.loadingOverlay}
        >
          <Loading_Spinner_area />
        </Container>
      )}

      {snackbar.visible && (
        <Pressable
          style={[
            StyleSheet.absoluteFillObject,
            {
              zIndex: 9998,
              elevation: 9998,
              backgroundColor: "rgba(0, 0, 0, 0.25)",
              // backgroundColor: "transparent",
            },
          ]}
          onPress={() => {}}
        />
      )}

      <Snack_Bar_Component
        snackbar={snackbar}
        bottom_ios={-25}
        bottom_android={-45}
        minHeight={80}
        minWidth="100%"
      />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.65)",
    zIndex: 9997,
    elevation: 9997,
  },
});
