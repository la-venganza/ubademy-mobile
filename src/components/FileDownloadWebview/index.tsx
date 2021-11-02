import React, { Component, useRef } from 'react';
import { View, Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

const { downloadAsync, documentDirectory } = FileSystem;

const FileDownloadWebview = ({ uri }) => {
  const webviewRef = useRef(null);
  const onShare = async (url) => {
    try {
      return Share.share({
        message: 'Choose location to save pdf file',
        url,
      });
    } catch (error) {
      return error;
    }
  };

  const documentPath = `${documentDirectory}name.pdf`;

  const downloadDocument = async (downloadUrl) => {
    const fileURI = await downloadAsync(
      downloadUrl,
      documentPath,
      {},
    );
    await onShare(fileURI.uri);
  };

  return (
    <WebView
      source={{
        uri,
      }}
      ref={webviewRef}
      javaScriptEnabled
      domStorageEnabled
      allowFileAccess
      allowUniversalAccessFromFileURLs
      allowingReadAccessToURL
      mixedContentMode="always"
      onFileDownload={({ nativeEvent: { downloadUrl } }) => downloadDocument(downloadUrl)}
    />
  );
};

export default FileDownloadWebview;
