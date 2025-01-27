type MaskedRegEx = string | RegExp;

const maskToRegex = (char: string): MaskedRegEx => {
  switch (char) {
    case 'A':
      return new RegExp('[a-zA-Z]');
    case '0':
      return new RegExp('\\d');
    default:
      return char;
  }
};

const maskToRegExMap = (text: string): MaskedRegEx[] => {
  const textMapDup = [...text];
  let isRecord = false;
  const map = textMapDup.reduce((acc, cur) => {
    if (cur === '[') {
      isRecord = true;
      return acc;
    }
    if (cur === ']') {
      isRecord = false;
      return acc;
    }
    if (isRecord) {
      acc.push(maskToRegex(cur));
    } else {
      acc.push(cur);
    }
    return acc;
  }, [] as MaskedRegEx[]);

  return map;
};

const getValue = (input: string, maskMap: MaskedRegEx[]) => {
  const inputArray = [...input];
  const maskMapDup = [...maskMap];
  let value = '';
  while (inputArray.length > 0) {
    const char = inputArray.shift() as string;
    const maskChar = maskMapDup.shift();
    if (typeof maskChar === 'object') {
      if (maskChar.test(char)) {
        value += char;
      }
    }
    if (typeof maskChar === 'string') {
      value += char;
    } else if (typeof maskChar === 'object') {
      if (maskChar.test(char)) {
        value += char;
      }
    }
  }
  return value;
};

const maskValue = (input: string, maskMap: MaskedRegEx[]) => {
  const inputArray = [...input];
  const maskMapDup = [...maskMap];
  let value = '';
  while (!(inputArray.length <= 0)) {
    let char = inputArray.shift();
    let maskChar = maskMapDup.shift();
    if (typeof maskChar === 'object') {
      if (char && maskChar.test(char)) {
        value += char;
      }
    } else {
      let tempValue = '';
      while (typeof maskChar === 'string') {
        if (char === maskChar) {
          char = inputArray.shift();
        }
        tempValue += maskChar;
        maskChar = maskMapDup.shift();
      }
      if (char && maskChar) {
        if ((maskChar as RegExp).test(char)) {
          tempValue += char;
          value += tempValue;
        }
      }
    }
  }
  return value;
};

export default {
  maskValue,
  getValue,
  maskToRegExMap,
};
