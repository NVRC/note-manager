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
import HeaderComponent from './header';



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
                        fontLoading: true,
                        };
    }

    componentDidMount(){
        db.transaction(tx => {
              tx.executeSql(
                'create table if not exists notes (id integer primary key not null, title text, tags text, note text);',
                [],
                ()=> console.log('created database'),
                ()=> console.log('db insert error')
              );
        });
    }

    parseText( text ){
        let tags = this.generateTags( text );
        this.setState({
            text: text,
            tags: tags,
            textSet: true,
        });
    }

    generateTags( text ){
        //  Splits words by whitespace
        return text.trim().split(/\s+/);

        //  TODO: Add semantic analysis and suggested keywords
    }

    getStringFromTags(){
        return JSON.stringify(this.state.tags);
    }

    publishNote(){
        console.log('Added Note:');
        console.log('Title:\t' +this.state.title);
        console.log('Text:\t'+this.state.text);

        db.transaction(
              tx => {
                tx.executeSql('insert into notes (title, tags, note) values (?, ?, ?)',
                [this.state.title,this.getStringFromTags(), this.state.text],
                ()=> console.log('note added to notes'),
                ()=> console.log('db insert error')
                );
              },
        );
        //  Reset Fields
        this.resetForm();
    }

    update(){
        db.transaction(tx => {
            tx.executeSql(
                `select * from notes;`,
                [],
                (_, { rows: { _array } }) => console.log(_array)
            );
        });
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
    resetForm(){
        this.setState({
            text: '',
            title: 'Untitled',
            tags: '',
        });
    }

    async componentWillMount(){
        await Expo.Font.loadAsync({
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        });
        this.setState({fontLoading: false});
    }

    render() {
        if(this.state.fontLoading == true){
            return <Expo.AppLoading/>;
        }

        return (
            <Container>
            <HeaderComponent {...this.props}/>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Title</Label>
                        <Input value={this.state.title} onChangeText={(title) => this.setState({title})}
                        onSubmitEditing={()=>this.search()}/>
                    </Item>
                    <Textarea value={this.state.text} onChangeText={(text) =>
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
            </Container>
        );
    }
}
