import React from 'react';
import renderer from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native'; // Required for components using useNavigation
import CustomHeader from '../src/components/Header';

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock useNavigation
const mockGoBack = jest.fn();
const mockCanGoBack = jest.fn(() => true); // Assume we can go back for testing the button
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockGoBack,
      canGoBack: mockCanGoBack,
    }),
  };
});

describe('<CustomHeader />', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockGoBack.mockClear();
    mockCanGoBack.mockClear();
  });

  it('renders correctly with title and back button', () => {
    mockCanGoBack.mockReturnValue(true); // Ensure back button is shown
    const tree = renderer.create(
      <NavigationContainer> {/* Wrap with NavigationContainer */}
        <CustomHeader title="Test Header" />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with title but without back button when showBackButton is false', () => {
    const tree = renderer.create(
      <NavigationContainer>
        <CustomHeader title="No Back Button" showBackButton={false} />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly without back button if navigation cannot go back', () => {
    mockCanGoBack.mockReturnValue(false); // Simulate cannot go back
    const tree = renderer.create(
      <NavigationContainer>
        <CustomHeader title="Cannot Go Back" />
      </NavigationContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Testing onPress of the back button requires @testing-library/react-native
});

