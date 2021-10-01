import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';

export default async () => {
  const config = new DdSdkReactNativeConfiguration(
    'pub3987cd6c0ba2130cde4c5be885f650a4',
    'develop',
    '0b029016-3a1d-4e06-ad5f-f5deeac1fd0e',
    true, // track User interactions (e.g.: Tap on buttons. You can use 'accessibilityLabel' element property to give tap action the name, otherwise element type will be reported)
    true, // track XHR Resources
    true, // track Errors
  );
  // Optional: Select your Datadog website (one of "US", "EU" or "GOV")
  config.site = 'US';
  // Optional: enable or disable native crash reports
  config.nativeCrashReportEnabled = true;
  // Optional: sample RUM sessions (here, 80% of session will be sent to Datadog. Default = 100%)
  config.sampleRate = 80;

  try {
    await DdSdkReactNative.initialize(config);
  } catch (error) {
    console.log('error===========>', error);
  }
  console.log('===========================>asd');

// Once SDK is initialized you need to setup view tracking to be able to see data in the RUM Dashboard.
};
