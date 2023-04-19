class GeneralService {
  public static shuffle = (arrParam: any[]): any[] => {
    let arr = arrParam.slice(),
      length = arr.length,
      temp,
      i;

    while (length) {
      i = Math.floor(Math.random() * length--);

      temp = arr[length];
      arr[length] = arr[i];
      arr[i] = temp;
    }

    return arr;
  };

  public static getRemaining = (time: any) => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time - minutes * 60;

    return {
      m: ('00' + minutes).slice(-'00'.length),
      s: ('00' + seconds).slice(-'00'.length),
    };
  };

  formatNumber = (value: any) => {
    let num2 = value.toString().split('.');
    let thousands = num2[0]
      .split('')
      .reverse()
      .join('')
      .match(/.{1,3}/g)
      .join(',');
    let decimals = num2[1] ? '.' + num2[1] : '';
    return (
      thousands
        .split('')
        .reverse()
        .join('') + decimals
    );
  };

  stripTags = (txt: any) => {
    const strip_tags = require('locutus/php/strings/strip_tags');
    let text_strip = strip_tags(txt)
      .replace(/&ntilde;/gm, 'ñ')
      .replace(/&nbsp;/gm, ' ')
      .replace(/&Ntilde;/gm, 'Ñ')
      .replace(/&amp;/gm, '&')
      .replace(/&Ntilde;/gm, 'Ñ')
      .replace(/&ntilde;/gm, 'ñ')
      .replace(/&Ntilde;/gm, 'Ñ')
      .replace(/&Agrave;/gm, 'À')
      .replace(/&Aacute;/gm, 'Á')
      .replace(/&Acirc;/gm, 'Â')
      .replace(/&Atilde;/gm, 'Ã')
      .replace(/&Auml;/gm, 'Ä')
      .replace(/&Aring;/gm, 'Å')
      .replace(/&AElig;/gm, 'Æ')
      .replace(/&Ccedil;/gm, 'Ç')
      .replace(/&Egrave;/gm, 'È')
      .replace(/&Eacute;/gm, 'É')
      .replace(/&Ecirc;/gm, 'Ê')
      .replace(/&Euml;/gm, 'Ë')
      .replace(/&Igrave;/gm, 'Ì')
      .replace(/&Iacute;/gm, 'Í')
      .replace(/&Icirc;/gm, 'Î')
      .replace(/&Iuml;/gm, 'Ï')
      .replace(/&ETH;/gm, 'Ð')
      .replace(/&Ntilde;/gm, 'Ñ')
      .replace(/&Ograve;/gm, 'Ò')
      .replace(/&Oacute;/gm, 'Ó')
      .replace(/&Ocirc;/gm, 'Ô')
      .replace(/&Otilde;/gm, 'Õ')
      .replace(/&Ouml;/gm, 'Ö')
      .replace(/&Oslash;/gm, 'Ø')
      .replace(/&Ugrave;/gm, 'Ù')
      .replace(/&Uacute;/gm, 'Ú')
      .replace(/&Ucirc;/gm, 'Û')
      .replace(/&Uuml;/gm, 'Ü')
      .replace(/&Yacute;/gm, 'Ý')
      .replace(/&THORN;/gm, 'Þ')
      .replace(/&szlig;/gm, 'ß')
      .replace(/&agrave;/gm, 'à')
      .replace(/&aacute;/gm, 'á')
      .replace(/&acirc;/gm, 'â')
      .replace(/&atilde;/gm, 'ã')
      .replace(/&auml;/gm, 'ä')
      .replace(/&aring;/gm, 'å')
      .replace(/&aelig;/gm, 'æ')
      .replace(/&ccedil;/gm, 'ç')
      .replace(/&egrave;/gm, 'è')
      .replace(/&eacute;/gm, 'é')
      .replace(/&ecirc;/gm, 'ê')
      .replace(/&euml;/gm, 'ë')
      .replace(/&igrave;/gm, 'ì')
      .replace(/&iacute;/gm, 'í')
      .replace(/&icirc;/gm, 'î')
      .replace(/&iuml;/gm, 'ï')
      .replace(/&eth;/gm, 'ð')
      .replace(/&ntilde;/gm, 'ñ')
      .replace(/&ograve;/gm, 'ò')
      .replace(/&oacute;/gm, 'ó')
      .replace(/&ocirc;/gm, 'ô')
      .replace(/&otilde;/gm, 'õ')
      .replace(/&ouml;/gm, 'ö')
      .replace(/&oslash;/gm, 'ø')
      .replace(/&ugrave;/gm, 'ù')
      .replace(/&uacute;/gm, 'ú')
      .replace(/&ucirc;/gm, 'û')
      .replace(/&uuml;/gm, 'ü')
      .replace(/&yacute;/gm, 'ý')
      .replace(/&thorn;/gm, 'þ')
      .replace(/&yuml;/gm, 'ÿ')
      .replace(/&iquest;/gm, '¿')
      .replace(/&quot;/gm, '"')
      .replace(/&ldquo;/gm, '"')
      .replace(/&rdquo;/gm, '"')
      .replace(/&ndash;/gm, '-')
      .replace(/&mdash;/gm, '—')
      .replace(/&lsquo;/gm, "'")
      .replace(/&rsquo;/gm, "'")
      .replace(/&sbquo;/gm, ',')
      .replace(/\s/gm, ' ')
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s+/g, ' ')
      .trim();
    return text_strip;
  };
}

export default GeneralService;
