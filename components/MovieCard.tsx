import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <View>
      <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity style={{
            flex:1,
        }}>
            <Image
                source={{
                    uri : poster_path 
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
                }}
                style={{
                    width: '100%',
                    height: 180,
                    borderRadius: 8,
                }}
                resizeMode = "cover"
            />
            <Text style ={{
                fontSize: 15,
                color:'white',
                fontWeight: "bold",
                borderRadius: 4,
            }} numberOfLines={1}
            >{ title }</Text>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                rowGap: 1,
            }}>
                <Image source={icons.star} style={{
                    width:16,
                    height:16,
                    marginRight: 4,
                    tintColor: "gold",
                }}/>
                <Text style={{
                    fontSize: 12,
                    color: "white",
                    fontWeight:"bold",
                    textTransform: "uppercase",
                }}>{Math.round(vote_average/2)}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 4,
            }}>
                <Text style={{
                    fontSize: 12,
                    color: "#a8b5db",
                    fontWeight: "600",
                    textTransform: "uppercase",
                }}>
                    {release_date?.split('-')[0]}
                </Text>
            </View>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({})