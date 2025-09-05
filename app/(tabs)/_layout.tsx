import { icons } from "@/constants/icons"
import { images } from "@/constants/images"
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: any) =>{
    if(focused){
        return(
            <ImageBackground 
                source={images.highlight}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                    // marginBottom: -15,
                    marginHorizontal: 20,
                    minWidth: 150,
                    minHeight: 40,
                }}
                resizeMode = 'contain' // preserve original pill shape
            >
            <Image 
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: '#151312',
                }} 
                resizeMode="contain"
            />
            <Text 
                style={{
                    marginLeft: 8,
                    fontSize: 14,
                    fontWeight: '700',
                    color:'#151312',
                }}>{title}</Text>
            </ImageBackground>
        )
    }else {
        return(
            <View 
                style = {{
                    justifyContent: "center",
                    alignItems:"center",
                    marginTop: 15,
                    borderRadius: 9999,
                }}
            >
                <Image source ={icon} tintColor="#A8B5DB" className= "size-5" />
            </View>
        )
    }
}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle:{
                width:"100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            },
            tabBarStyle:{
                backgroundColor: "#0f0D23",
                borderRadius: 35,
                marginHorizontal: 25,
                marginBottom: 5,
                height: 55,
                position:"absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#0f0D23",
            }
    }}
    >
        <Tabs.Screen 
            name="index"
            options ={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        icon = {icons.home}
                        title="Home"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="search"
            options ={{
                title: "Search",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        icon = {icons.search}
                        title="Search"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="saved"
            options ={{
                title: "Saved",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        icon = {icons.save}
                        title="Saved"
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="profile"
            options ={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon 
                        focused={focused}
                        icon = {icons.person}
                        title="Profile"
                    />
                )
            }}
        />
    </Tabs>
  )
}

export default _layout