import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {    Header,
            Item,
            Input,
            Icon,
            Button,
            Text,
            Left,   } from 'native-base';
import theme from '../styles/theme.style.js';


export default class HeaderComponent extends Component {
    render(){
        return(
            <Header searchBar rounded style={styles.headerStyle}>
                <Left>
                <Button transparent
                      onPress={()=>this.props.openDrawer()}
                >
                    <Icon name='ios-menu' />
                </Button>
                </Left>
                <Item>
                    <Input placeholder="Search" />
                    <Icon style={{color: theme.ACCENT_COLOR_DARKER}} name="ios-paper" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
        )
    }

}
module.exports = HeaderComponent;

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight,
        backgroundColor: theme.PRIMARY_COLOR,
    }
});
