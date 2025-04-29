import React from 'react';
import renderer from 'react-test-renderer';
import CustomButton from '../src/components/Button';

// Mock onPress function
const mockOnPress = jest.fn();

describe('<CustomButton />', () => {
  it('renders correctly with default props', () => {
    const tree = renderer.create(<CustomButton title="Test Button" onPress={mockOnPress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const tree = renderer.create(<CustomButton title="Disabled Button" onPress={mockOnPress} disabled />).toJSON();
    expect(tree).toMatchSnapshot();
    // Check if opacity style is applied for disabled state
    // Note: Specific style checks might be brittle, snapshot is often preferred
  });

  it('renders correctly when loading', () => {
    const tree = renderer.create(<CustomButton title="Loading Button" onPress={mockOnPress} loading />).toJSON();
    expect(tree).toMatchSnapshot();
    // Check if ActivityIndicator is rendered
  });

  it('renders correctly with secondary variant', () => {
    const tree = renderer.create(<CustomButton title="Secondary Button" onPress={mockOnPress} variant="secondary" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with danger variant', () => {
    const tree = renderer.create(<CustomButton title="Danger Button" onPress={mockOnPress} variant="danger" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // We can't easily test onPress directly with react-test-renderer
  // For interaction tests, consider using @testing-library/react-native
});

