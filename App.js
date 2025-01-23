import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, Image } from 'react-native';

let originalData = [];

const App = () => {
    const [mydata, setMyData] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=disneymovies&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    originalData = myJson;
                    setMyData(myJson);
                }
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const FilterData = (text) => {
        setSearchText(text);
        if (text !== '') {
            const filteredData = originalData.filter((item) =>
                item.Title && item.Title.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(filteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.Title || 'Untitled'}</Text>
            <Text style={styles.itemDetails}>
                {item.LengthMin ? `Length: ${item.LengthMin} min` : 'Length: N/A'}
            </Text>
            <Text style={styles.itemDetails}>
                {item.YearPublished ? `Year: ${item.YearPublished}` : 'Year: N/A'}
            </Text>
            <Text style={styles.itemDetails}>
                {item.Rating ? `Rating: ${item.Rating}` : 'Rating: N/A'}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar />
            <Image
                source={{ uri: 'https://th.bing.com/th/id/R.192b638419ea9dc5f06828cc491f4fa6?rik=Se%2bKRUK1BbMaLg&riu=http%3a%2f%2fwww.fotolip.com%2fwp-content%2fuploads%2f2016%2f05%2fDisney-logo-vector-2.png&ehk=YNT6IAD71TGII6mNkHXTG1N7CUKZRTsUKE41S18BEEY%3d&risl=&pid=ImgRaw&r=0' }}
                style={styles.logo}
                resizeMode="contain"
            />
            <Image
                source={{ uri: 'https://mvcdn.fancaps.net/9971521.jpg' }}
                style={styles.imageBetweenTitle}
                resizeMode="contain"
            />
            <Text style={styles.header}>Disney Movies</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for your favorite Disney movies..."
                value={searchText}
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item) => item.ID.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6EAF8',
        padding: 10,
    },
    logo: {
        width: '100%',
        height: 80,
        marginBottom: 15,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#3A5DAE',
        fontFamily: 'Cochin',
    },
    imageBetweenTitle: {
        width: '100%',
        height: 150,
        marginBottom: 15,
    },
    searchInput: {
        borderWidth: 2,
        borderColor: '#F8BBD0',
        borderRadius: 20,
        padding: 12,
        marginBottom: 15,
        backgroundColor: '#FFF',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    list: {
        flexGrow: 1,
    },
    itemContainer: {
        backgroundColor: '#fbf2f8',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: '#3A5DAE',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E3B8E',
        marginBottom: 5,
    },
    itemDetails: {
        fontSize: 14,
        color: '#5C5C8A',
    },
});

export default App;
