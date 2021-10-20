# Highlight My Word

插件功能：高亮自定义单词

## 功能

- 高亮自定义单词
- 支持主题切换

## 配置

|              配置               |                         描述                         |                                       示例                                       |
| :-----------------------------: | :--------------------------------------------------: | :------------------------------------------------------------------------------: |
| "highlight-my-word.basicTheme"  |             基础主题，配置词语与高亮颜色             |                         ` {"$primary_color": "#3072F6"}`                         |
|   "highlight-my-word.themes"    | 多主题时的自定义对象，使用时会与 basicTheme 进行合并 | `{ "driver": {"$primary_color": "#0DAF52"}, dark:{"$primary_color": "#595959"}}` |
| "highlight-my-word.curThemeKey" |           使用自定义主题时，对应主题的 key           |                                      'dark'                                      |

themes 与 basicTheme 同时配置时会进行合并

完整配置

```json
{
    "highlight-my-word.curThemeKey": "dark",
    "highlight-my-word.basicTheme": {
    "$primary_color": "#3072F6",
    "$error_color": "#FD615B",
    "$warning_color": "#FD615B",
    "$success_color": "#3072F6",
    "$waiting_color": "#FF9600",
    "$crm_money_color": "#FD615B",
    "$crm_down_color": "#FD615B",
    "$crm_up_color": "#30C790",
    "$crm_notice_color": "#FF960026",
    "$important_color": "#3072f6",
    "$nav_bg_color": "#ffffff",
    "$nav_left_back_color": "#333333",
    "$nav_title_text_color": "#333333",
    "$nav_left_text_color": "#333333",
    "$nav_right_text_color": "#3072F6",
    "$page_bg_color": "#F5F5F5",
    "$container_bg_color": "#FFFFFF",
    "$crm_content_bg_color": "#F5F5F5",
    "$crm_data_bg_color": "#1F1F29",
    "$mask_color": "#00000099",
    "$popup_mask_color": "#00000099",
    "$crm_separate_color1": "#DDDDDD",
    "$crm_separate_color2": "#99999966",
    "$text_color": "#333333",
    "$text_color_revert": "#FFFFFF",
    "$text_color_secondary": "#666666",
    "$crm_text_color_secondary_revert": "#FFFFFF99",
    "$text_color_sub": "#999999",
    "$crm_text_color_sub_revert": "#FFFFFF66",
    "$text_color_disabled": "#FFFFFFB3",
    "$text_color_hint": "#CCCCCC",
    "$crm_text_color_notice": "#FF9600",
    "$text_color_forbidden": "#BFBFBF",
    "$border_color": "#EEEEEE",
    "$crm_tag_deep_color1": "#3072F6",
    "$crm_tag_deep_color2": "#30C790",
    "$crm_tag_deep_color3": "#FD615B",
    "$crm_tag_deep_color4": "#FF9600",
    "$crm_tag_deep_color5": "#FFC300",
    "$crm_tag_light_color1": "#3072F626",
    "$crm_tag_light_color2": "#30C79026",
    "$crm_tag_light_color3": "#FD615B26",
    "$crm_tag_light_color4": "#FF960026",
    "$crm_tag_light_color5": "#FFC30026",
    "$crm_tag_light_color6": "#66666626",
    "$crm_tag_light_color7": "#FFFFFF26",
    "$supplementary_colorOne": "#30C790",
    "$supplementary_colorTwo": "#FD615B",
    "$supplementary_colorThree": "#FF9600",
    "$supplementary_colorFour": "#FFC300",
    "$crm_active_color": "#3072F6",
    "$icon_color_sub": "#CCCCCC",
    "$crm_icon_color_secondary": "#999999",
    "$crm_invalid_border_color": "#FFFFFF4D",
    "$crm_active_border_color": "#FFFFFF",
    "$crm_invalid_color": "#3072F64D"
  },
  "highlight-my-word.themes": {
    "driver": {
      "$primary_color": "#0DAF52",
      "$error_color": "#F5222D",
      "$warning_color": "#F5222D",
      "$success_color": "#0DAF52",
      "$important_color": "#0DAF52",
      "$waiting_color": "#FF9600",
      "$text_color": "#262626",
      "$text_color_revert": "#FFFFFF",
      "$text_color_secondary": "#595959",
      "$crm_text_color_secondary_revert": "#FFFFFF99",
      "$text_color_sub": "#8C8C8C",
      "$crm_text_color_sub_revert": "#FFFFFF66",
      "$text_color_hint": "#D9D9D9",
      "$page_bg_color": "#F4F4F4",
      "$container_bg_color": "#FFFFFF",
      "$mask_color": "#000000A6",
      "$border_color": "#F4F4F4",
      "$text_color_forbidden": "#BFBFBF",

      "$supplementary_colorOne": "#FA6400",
      "$supplementary_colorTwo": "#36A61C",
      "$supplementary_colorThree": "#5066A7",
      "$supplementary_colorFour": "#F56C6C",
      // 暂无
      "$supplementary_colorFive": "#FFF8D5"
    },
    "dark": {
      "$nav_bg_color": "#191919",
      "$nav_left_back_color": "#D9D9D9",
      "$nav_title_text_color": "#D9D9D9",
      "$nav_left_text_color": "#D9D9D9",
      "$nav_right_text_color": "#3072F6",
      "$crm_tag_deep_color1": "#3072F6",
      "$crm_tag_deep_color2": "#30C790",
      "$crm_tag_deep_color3": "#FD615B",
      "$crm_tag_deep_color4": "#FF9600",
      "$crm_tag_deep_color5": "#FFC300",
      "$crm_tag_light_color1": "#3072F626",
      "$crm_tag_light_color2": "#30C79026",
      "$crm_tag_light_color3": "#FD615B26",
      "$crm_tag_light_color4": "#FF960026",
      "$crm_tag_light_color5": "#FFC30026",
      "$crm_tag_light_color6": "#66666626",
      "$crm_active_border_color": "#191919",
      "$crm_invalid_border_color": "#1919194D",
      "$crm_icon_color_secondary": "#595959",
      "$icon_color_sub": "#595959",
      "$crm_active_color": "#3072F6",
      "$crm_invalid_color": "#3072F64D",
      "$primary_color": "#3072F6",
      "$error_color": "#FD615B",
      "$warning_color": "#FD615B",
      "$success_color": "#3072F6",
      "$waiting_color": "#FF9600",
      "$crm_money_color": "#FD615B",
      "$crm_down_color": "#FD615B",
      "$crm_up_color": "#30C790",
      "$crm_notice_color": "#FF960026",
      "$important_color": "#3072f6",
      "$text_color": "#D9D9D9",
      "$text_color_revert": "#FFFFFF",
      "$text_color_secondary": "#A6A6A6",
      "$crm_text_color_secondary_revert": "#FFFFFF99",
      "$text_color_sub": "#595959",
      "$crm_text_color_sub_revert": "#FFFFFF66",
      "$text_color_disabled": "#FFFFFFB3",
      "$text_color_hint": "#595959",
      "$text_color_forbidden": "#BFBFBF",
      "$crm_text_color_notice": "#FF9600",
      "$supplementary_colorOne": "#30C790",
      "$supplementary_colorTwo": "#FD615B",
      "$supplementary_colorThree": "#FF9600",
      "$supplementary_colorFour": "#FFC300",
      "$page_bg_color": "#0A0A0A",
      "$container_bg_color": "#191919",
      "$crm_content_bg_color": "#262626",
      "$crm_data_bg_color": "#1F1F29",
      "$mask_color": "#00000099",
      "$crm_separate_color1": "#FFFFFF1F",
      "$crm_separate_color2": "#59595966",
      "$border_color": "#FFFFFF14",
      "$popup_mask_color": "#00000099"
    }
}
```
