import React, { Component } from "react";
import { Text, View,StyleSheet,SafeAreaView,ScrollView,FlatList,Linking} from 'react-native';
import { Provider ,Appbar,Card,IconButton,Avatar} from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import Icon from 'react-native-vector-icons/Entypo';

const Item =({phoneNumbers,name,id}) =>(
  <Card key={id} style={styles.cardbox}  onPress={() => handleClick(phoneNumbers ? phoneNumbers[0].number : '')}  >
  <Card.Title
      title= {name}
      left={(props) =>    <Icon name="user"  style={styles.iconBox} size={27} color="#900" />}
      subtitle={phoneNumbers ? phoneNumbers[0].number : ''}
  />
  </Card>
);

const Contactos = () => {
    const renderItem = ({item}) =>(
        <Item phoneNumbers={item.phoneNumbers} name={item.name} id={item.id}/>
    );

    const [data, setData] = React.useState([]);
    
    const [PhoneNumber, setPhoneNumber] = React.useState([]);

    const _goBack = () => console.log('Went back');

    const _handleSearch = () => console.log('Searching');

    const _handleMore = () => console.log('Shown more');

    const handleClick = async (number) => {
       Linking.openURL(`tel:${number}`)
    };


    React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });
            
            setData(data);
          }
        })();
      }, []);

    return (
    <Provider>
      {/*
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title="User Contacts List" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
    */}
        <View style={styles.mainbox}>
            <SafeAreaView style={styles.container}>
              <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}/>
            </SafeAreaView>
        </View>
    </Provider>
  );
};


const styles = StyleSheet.create({
    title:{
        margin: 10,
        fontSize: 15,
        fontSize: 35
    },
    mainbox:{
        textAlign:'center',
        marginLeft:10,
        marginRight:10,
        marginBottom:0,
        flex: 1,
        justifyContent: 'space-between',
    },
    cardbox:{
        margin: 5,
    },
    header:{
        backgroundColor: '#e2e2e2',
    },
    iconBox:{
        width: 50,
        height:50,
        backgroundColor: '#e2e2e2',
        borderRadius: 100,
        paddingTop: 10,
        textAlign:'center',
    }
});
export default Contactos;