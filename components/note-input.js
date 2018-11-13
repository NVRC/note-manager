import React, { Component } from "react";
import {    Container,
            Header,
            Content,
            Textarea,
            Form,
            Item,
            Input,
            AsyncStorage,
            Label,
            List,
            ListItem,
            Text,
            Spinner,
            Fab,
            Icon
        } from "native-base";

//          SQLite supported on Expo
import Expo, { SQLite } from 'expo';
import theme from '../styles/theme.style.js';


const DB_STR = 'notes.db';
const db = SQLite.openDatabase(DB_STR);


export default class NoteInput extends Component {


/*
    var Datastore = require('react-native-local-mongodb'),
    let _db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
*/

    constructor(props) {
        super(props);
        this.state = {  title: '',
                        text: '',
                        tags: '',
                        searching: false,
                        textSet: false,
                        };
    }

    componentDidMount(){

    }

    parseText( text ){
        let tags = this.generateTags( text );
        this.setState({
            tags: tags,
            textSet: true,
        });
    }

    generateTags( text ){
        //  Splits words by whitespace
        return text.trim().split(/\s+/);

        //  TODO: Add semantic analysis and suggested keywords
    }

    publishNote(){

    }


    dbFactoryMakeStruct(names) {
        var names = names.split(' ');
          var count = names.length;
          function constructor() {
            for (var i = 0; i < count; i++) {
              this[names[i]] = arguments[i];
            }
          }
          return constructor;
    }

    addNoteEntry( note ){
        let Item = dbFactoryMakeStruct("id note tag");
        let noteItem = new Item(0, 'some text', 'txt');

    }

    search() {
        // Set loading to true when the search starts to display a Spinner
        // Preform autocomplete operations
        //  likely prefix search tree
        this.setState({
            searching: true
        });
    }

    render() {

        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Title</Label>
                        <Input onChangeText={(title) => this.setState({title})}
                        onSubmitEditing={()=>this.search()}/>
                    </Item>
                    <Textarea onChangeText={(text) =>
                        this.parseText(text)
                    } rowSpan={6}
                    bordered placeholder="Type an idea to get started"
                    />
                </Form>
                {!this.state.textSet? <Spinner/> :
                    <List dataArray={this.state.tags}
                        renderRow={(item) =>
                        <ListItem>
                        <Text>{item}</Text>
                        </ListItem>
                    }/>

                }
                <Fab
                    active={false}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: theme.ACCENT_COLOR_LIGHT }}
                    position="bottomRight"
                    onPress={() => this.publishNote()}
                >
                  <Icon name="ios-send" />
                </Fab>


            </Content>
        );
    }
}
