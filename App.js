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
import NoteInput from './components/note-input';
import { DrawerNavigator } from 'react-navigation';
import NoteDisplay from './components/note-display';


export default DrawerNavigator (
    {
      InputNote:{
        screen:NoteInput
      },
      DisplayNotes:{
        screen:NoteDisplay
      }
    },{
        initialRouteName:'InputNote'
    }
)

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
