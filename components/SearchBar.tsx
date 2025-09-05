import { icons } from '@/constants/icons';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface Props{
    placeholder: string;
    onPress?: () => void;
    value ?: string;
    onChangeText ?: (text:string)=>void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText } : Props) => {
  return (
    <View 
        style = {{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            backgroundColor: '#0f0d23',
            borderRadius: 9999,
            paddingHorizontal: 20,
            paddingVertical: 10,}}
    >
            <Image source={icons.search} style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: '#ab8bff',
            }} />
            <TextInput
                placeholder={placeholder}
                value= {value}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                onPress={onPress}
                style={{
                    flex:1,
                    marginLeft: 20,
                    color: "white",
                    fontSize: 16,
                }}
            ></TextInput>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})