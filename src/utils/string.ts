
export type MatchResult = {
  index: number;
  target: string;
} | null;
/**
 * 从指定位置开始正则匹配关键词，返回匹配结果和索引
 * @param str 
 * @param pattern 
 * @param startIndex 
 * @returns 
 */
export const match = (str: string, pattern: RegExp, startIndex?: number): MatchResult => {
  if (!str) {
    return null;
  };
  if (!startIndex) {
    const matchResult = str.match(pattern);
    if (matchResult) {
      return {
        index: matchResult.index || -1,
        target: matchResult[0],
      };
    }
    return null;
  }
  const newStr = str.substr(startIndex);
  const partMatchResult = match(newStr, pattern);
  if (partMatchResult) {
    return {
      ...partMatchResult,
      index: startIndex + partMatchResult.index,
    };
  }
  return null;
};

/**
 * 转换字符串中正则语法保留关键字， 如$
 * todo:判断逻辑待优化,转换的词语是否是应该转换的词语
 * @param str 
 * @returns 
 */
export const transSafeWord = (str: string): string => {
  let result = str;
  for (let i = 0; i < result.length; ++i) {
    const char = result[i];
    if ((char > 'z' || char < 'a') && (char < 'A' || char > 'Z') && Number.isNaN(Number(char))) {
      result = result.slice(0, i) + '\\' + result.slice(i);
      ++i;
    }
  }
  return result;
};