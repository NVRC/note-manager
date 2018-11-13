import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {    Container,
            Header,
            Item,
            Input,
            Icon,
            Button,
            Text,
            Drawer  } from 'native-base';
import { Font, AppLoading, Constants } from "expo";
import Sidebar from './components/sidebar';
import HeaderComponent from './components/header';
import NoteInput from './components/note-input';

export default class App extends React.Component {
    state = {
        fontLoaded: false,
    }

    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

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
            <Drawer style={styles.drawerStyle}
                ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar/>}
                onClose={() => this.closeDrawer()}
            >
                <Container>
                    <HeaderComponent
                        openDrawer={this.openDrawer.bind(this)}
                    />

                    <NoteInput/>


                </Container>
            </Drawer>
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
  drawerStyle: {
  },
});
