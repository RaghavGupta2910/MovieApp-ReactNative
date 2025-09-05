import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import { updateSearchCount } from '@/services/appwrite';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const screewidth = Dimensions.get("window").width;
const CARD_WIDTH = (screewidth-70)/3;

const search = () => {
  const [searchquery, setSearchquery] = useState('');

  const {
    data : movies,
    loading,
    error,
    refetch : loadingMovies,
    reset,
  } = useFetch(() => fetchMovies({ 
      query: searchquery 
    }), false)
  
  useEffect(() =>{
    const timeoutId = setTimeout(async() => {
      if(searchquery.trim()){
        await loadingMovies();
      }else{
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchquery]);
  
  useEffect(() =>{
    if(movies?.length > 0 && movies?.[0]){
      updateSearchCount(searchquery, movies[0]);
    }
  }, [movies])

  return (
    <View style={{
      flex:1,
      backgroundColor: "#030014",
    }}>
      <Image
        source={images.bg}
        style={{
          flex:1,
          position: "absolute",
          width: "100%",
          resizeMode: "cover",
        }}
      />

      <FlatList
        data={movies}
        renderItem = {({ item }) =>( 
        <View style ={{
            width: CARD_WIDTH,
            marginBottom: 5,
        }}>
        <MovieCard {...item} />
        </View>
        )}
        keyExtractor={( item ) => item.id.toString()}
        numColumns={3}
        style={{
          paddingHorizontal: 20,
        }}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom:100
        }}
        ListHeaderComponent={
          <>
            <View style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 70,
            }}>
              <Image source={icons.logo} 
                style={{
                  width: 75,
                  height: 45,
                  resizeMode: "contain",
                }}
              />
            </View>

            <View style={{
              marginVertical: 15,
            }}>
              <SearchBar 
              placeholder='Search Movies ...'
              value = {searchquery}
              onChangeText = {(text : string) => setSearchquery(text)}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#0000ff" style={{
                marginVertical: 5,
              }}/>
            )}

            {error && (
              <Text style={{
                color: "red",
                fontSize: 15,
                paddingHorizontal: 20,
                marginVertical: 5
              }}>
                Error : {error.message}
              </Text>
            )}

            {!loading && !error && searchquery.trim() && movies?.length > 0 && (
              <Text style={{
                color: "white",
                fontSize: 18,
                fontWeight: "700",
              }}>
                Search Results for
                <Text style={{
                  color: "#AB8BFF"
                }}> {searchquery} </Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View style={{marginTop: 10, paddingHorizontal: 10}}>
              <Text style={{textAlign:"center", color: "gray", fontSize: 15}}>
                {searchquery.trim() ? 'No Movies Found' : "Search for a Movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})