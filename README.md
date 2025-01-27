# react-native-mask-input

javascript add-on for masking text in react-native Input

## Installation

```sh
npm install react-native-mask-input
```

## Usage


```tsx
import MaskInput from 'react-native-mask-input';

// ...

return (
    <View>
        <MaskInput mask="[000]-[000]-[0000]"/>
    </View>
)
```

## Props

### `TextInputProps`

Inherits [TextInput Props](https://reactnative.dev/docs/textinput)

### `mask`

The mask key should be inside [ ]. for example, `[AA0]-[0000000000]`

When not set, the component act like `TextInput`
| maskChar | value                |
| -------- | -------------------- |
| A        | a-z case insensitive |
| 0        | number               |
| W        | word                 |





## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
