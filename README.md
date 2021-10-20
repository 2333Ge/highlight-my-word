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

themes 与 basicTheme 同时配置时会进行合并，如下例所示，$primary_color最终会是#191919，但$text_color是 #333333

配置示例

```json
{
    "highlight-my-word.curThemeKey": "dark",
    "highlight-my-word.basicTheme": {
    "$primary_color": "#3072F6",
    "$text_color": "#333333"
  },
  "highlight-my-word.themes": {
    "driver": {
      "$primary_color": "#0DAF52",
    },
    "dark": {
      "$primary_color": "#191919",
    }
}
```
