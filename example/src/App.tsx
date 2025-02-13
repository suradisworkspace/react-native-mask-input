import { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaskInput, { type MaskInputRef } from 'react-native-mask-input';

export default function App() {
  const [value, setValue] = useState('');
  const inputRef = useRef<MaskInputRef>(null);
  return (
    <View style={styles.container}>
      <Text>Non declare value</Text>
      <MaskInput mask="[AA0]-[0000000]-[00]" style={styles.input} />
      <Text>declareValue</Text>
      <MaskInput
        mask="[000]-[000]-[0000]"
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
      <Text>ref</Text>
      <MaskInput
        ref={inputRef}
        mask="[000]-[000]-[0000]"
        defaultValue="095"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: 150,
  },
});
