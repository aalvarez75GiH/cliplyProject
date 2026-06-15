import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.text.primary};
  
`;

const logo_caption = (theme) => `
    font-size: ${"20px"};
    font-family: ${theme.fonts.bold};
`;
const menu_tiles_caption = (theme) => `
    font-size: ${"18px"};
    font-family: ${theme.fonts.bold};
`;
const transcripted_message_caption = (theme) => `
font-size: ${theme.fontSizes.copied_message_tile};
    font-family: ${theme.fonts.bold};
    text-align: center;
    `;
const transcripted_message_copied_caption = (theme) => `
font-size: ${theme.fontSizes.copied_message_tile};
    font-family: ${theme.fonts.bold};
    text-align: center;
    color: ${theme.colors.text.secondary};
    `;
const middle_screens_caption = (theme) => `
    font-size: ${theme.fontSizes.middle_screens_caption};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.middle_screens_text};
    `;
const headers_caption = (theme) => `
    font-size: ${theme.fontSizes.headers};
    font-family: ${theme.fonts.semi_bold};
    `;
const squared_ctas = (theme) => `
    font-size: ${theme.fontSizes.sq_ctas};
    font-family: ${theme.fonts.bold};
    `;
const numbers_ctas_black = (theme) => `
    font-size: ${theme.fontSizes.numbers_ctas};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
`;
const numbers_ctas_white = (theme) => `
    font-size: ${theme.fontSizes.numbers_ctas};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
`;
const stages_ctas_black = (theme) => `
    font-size: ${theme.fontSizes.stages_ctas};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
`;
const stages_ctas_white = (theme) => `
font-size: ${theme.fontSizes.stages_ctas};
font-family: ${theme.fonts.bold};
color: ${theme.colors.text.secondary};
`;
const stages_headers = (theme) => `
font-size: ${theme.fontSizes.stages_headers};
    font-family: ${theme.fonts.bold};
`;
const text_inputs = (theme) => `
    font-size: ${theme.fontSizes.text_inputs};
    font-family: ${theme.fonts.bold};
`;
const semi_rounded_ctas_white = (theme) => `
    font-size: ${theme.fontSizes.semi_rounded_ctas};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const semi_rounded_ctas_black = (theme) => `
    font-size: ${theme.fontSizes.semi_rounded_ctas};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
`;
const en_es_ctas = (theme) => `
    font-size: ${theme.fontSizes.en_es_ctas};
    font-family: ${theme.fonts.bold};
    `;
const bottom_tab_bar_caption = (theme) => `
font-size: ${theme.fontSizes.bottom_tab_bar};
    font-family: ${theme.fonts.semi_bold};
    `;

const underlined_small_caption = (theme) => `
    font-size: ${theme.fontSizes.bottom_tab_bar};
    font-family: ${theme.fonts.regular};
    font-style: underline;
    `;
const underlined_small_caption_black = (theme) => `
    font-size: ${theme.fontSizes.bottom_tab_bar};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const copied_message_tile_caption = (theme) => `
    font-size: ${theme.fontSizes.copied_message_tile};
    font-family: ${theme.fonts.bold};
    text-align: center;
    color: ${theme.colors.text.secondary};
    `;
const message_tile_caption = (theme) => `
    font-size: ${"18px"};
    font-family: ${theme.fonts.bold};
    text-align: center;
    color: ${theme.colors.text.primary};
    `;

const ES_EN_ctas_black = (theme) => `
        font-size: ${theme.fontSizes.en_es_cta};
        font-family: ${theme.fonts.bold};
        color: ${theme.colors.text.primary};
    `;
const menu_sub_title_text = (theme) => `
        font-size: ${theme.fontSizes.menu_sub_title_text};
        font-family: ${theme.fonts.bold};
        color: ${theme.colors.text.primary};
    `;
const menu_sub_title_text_2 = (theme) => `
        font-size: ${"24px"};
        font-family: ${theme.fonts.bold};
        color: ${theme.colors.text.primary};
    `;
const summary_tile_caption = (theme) => `
        font-size: ${theme.fontSizes.summary_tile_text};
        font-family: ${theme.fonts.bold};
        text-align: center;
        
        `;
// ****************************************************************************
const dm_sans_bold_40 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_40};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_40_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_40};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_28 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_28};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_28_centered = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_28};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    text-align: center;
    `;
const dm_sans_bold_26_centered = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_26};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    text-align: center;
    `;
const dm_sans_bold_24 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_24};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_24_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_24};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_22 = (theme) => `
        font-size: ${theme.fontSizes.dm_sans_22};
        font-family: ${theme.fonts.bold};
        color: ${theme.colors.text.primary};
        `;
const dm_sans_bold_20 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_20};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_regular_20 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_20};
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_20_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_20};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_20_grey = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_20};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.disabled};
    `;
const dm_sans_bold_18 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_18};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_regular_18 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_18};
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_18_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_18};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_18_white_centered = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_18};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    text-align: center;
    `;
const dm_sans_bold_16 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_16};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_regular_16 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_16};
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_16_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_16};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_16_white_centered = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_16};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    text-align: center;
    `;
const dm_sans_bold_16_disable_not_active = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_16};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.disabled};
    `;
const dm_sans_bold_14 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_14};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_14_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_14};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_14_disable_not_active = (theme) => `
        font-size: ${theme.fontSizes.dm_sans_bold_14};
        font-family: ${theme.fonts.bold};
        color: ${theme.colors.text.disabled};
        `;
const dm_sans_bold_12 = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_12};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.primary};
    `;
const dm_sans_bold_12_error_cancel = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_12};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.error};
    `;
const dm_sans_bold_12_white = (theme) => `
    font-size: ${theme.fontSizes.dm_sans_bold_12};
    font-family: ${theme.fonts.bold};
    color: ${theme.colors.text.secondary};
    `;
const dm_sans_bold_12_disable_not_active = (theme) => `
        font-size: ${theme.fontSizes.dm_sans_bold_12};
        font-family: ${theme.fonts.bold};
        color: ${theme.colors.text.disabled};
        `;

const variants = {
  summary_tile_caption,
  logo_caption,
  transcripted_message_caption,
  copied_message_tile_caption,
  middle_screens_caption,
  headers_caption,
  squared_ctas,
  numbers_ctas_black,
  numbers_ctas_white,
  stages_ctas_black,
  stages_ctas_white,
  stages_headers,
  text_inputs,
  semi_rounded_ctas_white,
  semi_rounded_ctas_black,
  en_es_ctas,
  bottom_tab_bar_caption,
  underlined_small_caption,
  ES_EN_ctas_black,
  transcripted_message_copied_caption,
  underlined_small_caption_black,
  menu_tiles_caption,
  menu_sub_title_text,
  menu_sub_title_text_2,
  message_tile_caption,
  dm_sans_bold_40,
  dm_sans_bold_40_white,
  dm_sans_bold_28,
  dm_sans_bold_28_centered,
  dm_sans_bold_26_centered,
  dm_sans_bold_24,
  dm_sans_bold_24_white,
  dm_sans_bold_22,
  dm_sans_bold_20,
  dm_sans_regular_20,
  dm_sans_bold_20_white,
  dm_sans_bold_20_grey,
  dm_sans_bold_18,
  dm_sans_regular_18,
  dm_sans_bold_18_white,
  dm_sans_bold_18_white_centered,
  dm_sans_bold_16,
  dm_sans_regular_16,
  dm_sans_bold_16_white,
  dm_sans_bold_16_white_centered,
  dm_sans_bold_16_disable_not_active,
  dm_sans_bold_14,
  dm_sans_bold_14_white,
  dm_sans_bold_14_disable_not_active,
  dm_sans_bold_12,
  dm_sans_bold_12_white,
  dm_sans_bold_12_disable_not_active,
  dm_sans_bold_12_error_cancel,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
