import React, { Component } from "react";
import {    Container,
            Content,
            Text,
            List,
            ListItem
                } from "native-base";

//          SQLite supported on Expo
import Expo, { SQLite } from 'expo';
import HeaderComponent from './header';


const DB_STR = 'notes.db';
const db = SQLite.openDatabase(DB_STR);



export default class NoteDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {  items: null,
                        };
    }

    componentDidMount(){
        db.transaction(tx => {
            tx.executeSql(
                `select * from notes;`,
                [],
                (_, { rows: { _array } }) => this.buildStateArray( _array )
            );
        });
    }

    buildStateArray( src ){
        let array = [];
        for(let i = 0; i < src.length; i++){
            array.push(src[i]);
        }
        this.setState({items: array});
        return array;
    }



    render() {
        var items =[];
        if(this.state.items != null){
            items = this.state.items.map(element => {
                return element.title;
            });
        }

        return (
            <Container>
                <Content>
                    <HeaderComponent {...this.props}/>
                    <Text>Note Display</Text>
                    <List dataArray={items}
                        renderRow={(item) =>
                        <ListItem>
                        <Text>{item}</Text>
                        </ListItem>
                        }>
                    </List>
                </Content>
            </Container>
        );
    }

}
