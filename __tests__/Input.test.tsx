import React from 'react';
import renderer from 'react-test-renderer';
import CustomInput from '../src/components/Input';

// Mock onChangeText function
const mockOnChangeText = jest.fn();

describe('<CustomInput />', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(
      <CustomInput 
        placeholder="Test Input"
        value=""
        onChangeText={mockOnChangeText}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with a label', () => {
    const tree = renderer.create(
      <CustomInput 
        label="Test Label"
        placeholder="Input with label"
        value=""
        onChangeText={mockOnChangeText}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with an error message', () => {
    const tree = renderer.create(
      <CustomInput 
        label="Input with Error"
        placeholder="Enter text"
        value="invalid input"
        onChangeText={mockOnChangeText}
        error="This field is required"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
    // Check if error style and error text are rendered
  });

  it('renders correctly with a predefined value', () => {
    const tree = renderer.create(
      <CustomInput 
        placeholder="Should have value"
        value="Predefined Value"
        onChangeText={mockOnChangeText}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Testing onChangeText behavior requires a different testing library like @testing-library/react-native
});

