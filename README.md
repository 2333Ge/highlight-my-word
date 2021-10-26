# Highlight My Word

插件功能：高亮自定义单词

## 功能

- 高亮自定义单词
- 支持主题切换
- 鼠标悬浮到主题变量时显示真实色值

## 配置

|              配置               |                         描述                         |                                       示例                                       |
| :-----------------------------: | :--------------------------------------------------: | :------------------------------------------------------------------------------: |
| "highlight-my-word.basicTheme"  |             基础主题，配置词语与高亮颜色             |                         ` {"$primary_color": "#3072F6"}`                         |
|   "highlight-my-word.themes"    | 多主题时的自定义对象，使用时会与 basicTheme 进行合并 | `{ "driver": {"$primary_color": "#0DAF52"}, dark:{"$primary_color": "#595959"}}` |
| "highlight-my-word.curThemeKey" |           使用自定义主题时，对应主题的 key           |                                      'dark'                                      |

themes 与 basicTheme 同时配置时会进行合并，如下例所示，$primary_color最终会是#191919，但$text_color 是 #333333

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

## 主题切换

可用以下方式

- 点击底部状态栏：Highlight My Word
- cmd + shift + P => 输入：切换主题(choose theme)
- setting.json 中配置 curThemeKey

# 相关链接

[1][相关VSCode API使用总结](https://juejin.cn/post/7021931752914419743)
