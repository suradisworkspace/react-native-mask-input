import { TextInput, type TextInputProps } from 'react-native';
import MaskUtils from './MaskUtils';
import { forwardRef, useState } from 'react';

export type MaskInputPropsType = TextInputProps & ExtraInputProps;

type ExtraInputProps = {
  mask?: string;
  onChangeText?: (maskText: string, value?: string) => void;
};

const InputMain = forwardRef<TextInput, MaskInputPropsType>((props, ref) => {
  if (props.mask) {
    return (
      <MaskInput
        ref={ref}
        mask={props.mask as NonNullable<MaskInputPropsType['mask']>}
        {...props}
      />
    );
  }
  return <TextInput ref={ref} {...props} />;
});

const MaskInput = forwardRef<
  TextInput,
  MaskInputPropsType & {
    mask: NonNullable<ExtraInputProps['mask']>;
  }
>((props, ref) => {
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
      ref={ref}
      value={selectedValue}
      onChangeText={onChangeText}
      {...otherProps}
    />
  );
});

export default InputMain;
