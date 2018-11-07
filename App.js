import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {    Container,
            Header,
            Item,
            Input,
            Icon,
            Button,
            Text } from 'native-base';
import { Font, AppLoading, Constants } from "expo";


export default class App extends React.Component {
    state = {
        fontLoaded: false,
    }

    async componentWillMount(){
        await Expo.Font.loadAsync({
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        this.setState({fontLoaded: true});
    }

    render() {
        if(this.state.fontLoaded == false){
            return <Expo.AppLoading/>;
        }

        // NOTE: Currently only ios-# icons work on Expo
        return (
            <Container>
                <Header searchBar rounded style={styles.headerStyle}>
                    <Item>
                        <Input placeholder="Search" />
                        <Icon name="ios-paper" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
            </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  headerStyle: {
      marginTop: (Platform.OS === 'ios') ? 0 : Expo.Constants.statusBarHeight
  }
});
