export const htmlDecode = (html: string): string => {
  let returnText = html;
  returnText = returnText.replace(/&nbsp;/gi, ' ');
  returnText = returnText.replace(/&amp;/gi, '&');
  returnText = returnText.replace(/&lt;/gi, '<');
  returnText = returnText.replace(/&gt;/gi, '>');
  return returnText;
};

export const HtmlCleaner = (html: string): string => {
  return htmlDecode(html)
    .replace(
      /<(\w+)\b(?:\s+[\w\-.:]+(?:\s*=\s*(?:"[^"]*"|"[^"]*"|[\w\-.:]+))?)*\s*\/?>\s*<\/\1\s*>/,
      '',
    )
    .replace(/<([^<\/>]*)([^<\/>]*)>([\s]*?)*<\/\1>/im, '');
};
