import { forwardRef, useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import MaskUtils from './MaskUtils';

export interface MaskInputPropsType extends TextInputProps {
  mask?: string;
}

export type MaskInputRef = TextInput;

const InputMain = forwardRef<MaskInputRef, MaskInputPropsType>((props, ref) => {
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
  MaskInputRef,
  MaskInputPropsType & {
    mask: NonNullable<MaskInputPropsType['mask']>;
  }
>((props, ref) => {
  const {
    onChangeText: onChangeTextProps,
    value: valueProps,
    defaultValue: defaultValueProps,
    mask: maskProps,
    maxLength: maxLengthProps,
    ...otherProps
  } = props;
  const maskMap = MaskUtils.maskToRegExMap(maskProps);
  const [value, setValue] = useState(
    MaskUtils.maskValue(defaultValueProps || '', maskMap)
  );

  const maxLength = maskProps ? maskMap.length : maxLengthProps;
  const selectedValue = valueProps ?? value;

  const onChangeText = (text: string) => {
    const validate = MaskUtils.maskValue(text, maskMap);
    // const pureValue = MaskUtils.getValue(validate, maskMap);
    !valueProps && setValue(validate);
    onChangeTextProps && onChangeTextProps(validate);
  };

  return (
    <TextInput
      ref={ref}
      value={selectedValue}
      onChangeText={onChangeText}
      maxLength={maxLength}
      {...otherProps}
    />
  );
});

export default InputMain;
