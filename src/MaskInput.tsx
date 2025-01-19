import { TextInput, type TextInputProps } from 'react-native';
import MaskUtils from './MaskUtils';
import { useState } from 'react';

export type MaskInputPropsType = TextInputProps & ExtraInputProps;

type ExtraInputProps = {
  mask?: string;
  onChangeText?: (maskText: string, value?: string) => void;
};

const InputMain = (props: MaskInputPropsType) => {
  if (props.mask) {
    return (
      <MaskInput
        mask={props.mask as NonNullable<MaskInputPropsType['mask']>}
        {...props}
      />
    );
  }
  return <TextInput {...props} />;
};

const MaskInput = (
  props: MaskInputPropsType & {
    mask: NonNullable<ExtraInputProps['mask']>;
  }
) => {
  const {
    onChangeText: onChangeTextProps,
    value: valueProps,
    defaultValue: defaultValueProps,
    mask: maskProps,
    ...otherProps
  } = props;
  const maskMap = MaskUtils.maskToRegExMap(maskProps);
  const [value, setValue] = useState(
    MaskUtils.maskValue(defaultValueProps || '', maskMap)
  );
  const selectedValue = valueProps ?? value;

  const onChangeText = (text: string) => {
    const validate = MaskUtils.maskValue(text, maskMap);
    const pureValue = MaskUtils.getValue(validate, maskMap);
    !valueProps && setValue(validate);
    onChangeTextProps && onChangeTextProps(validate, pureValue);
  };

  return (
    <TextInput
      value={selectedValue}
      onChangeText={onChangeText}
      {...otherProps}
    />
  );
};

export default InputMain;
