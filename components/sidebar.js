import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import {Content} from 'native-base';
import theme from '../styles/theme.style.js';

export default class Sidebar extends Component {
    render() {
        return (
            <Content style={styles.sidebarStyle}>
                <Text>Drawer</Text>
            </Content>
        );
    }
}

module.exports = Sidebar;

const styles = StyleSheet.create({
    sidebarStyle: {
        marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
        backgroundColor: theme.ACCENT_COLOR_LIGHTER,
    }
});
