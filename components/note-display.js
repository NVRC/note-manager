import React, { Component } from "react";
import {    Container,
            Content,
            Text,
                } from "native-base";

//          SQLite supported on Expo
import Expo, { SQLite } from 'expo';
import HeaderComponent from './header';


const DB_STR = 'notes.db';
const db = SQLite.openDatabase(DB_STR);


export default class NoteDisplay extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <HeaderComponent {...this.props}/>
                    <Text>Note Display</Text>
                </Content>
            </Container>
        );
    }

}
