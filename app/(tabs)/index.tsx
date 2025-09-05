import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCars from "@/components/TrendingCars";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { trendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, Text, View } from "react-native";

const screewidth = Dimensions.get("window").width;
const CARD_WIDTH = (screewidth-70)/3;

export default function Index() {
  const router = useRouter();

  const {
    data : trendingmovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(() => trendingMovies())

  const {
    data : movies,
    loading: moviesLoading,
    error: moviesError} = useFetch(() => fetchMovies({ 
      query: '' 
    }))

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#030014',
      }}>
      <Image 
        source={images.bg}
        style = {{
          position: "absolute",
          width: "100%",
          resizeMode: "cover",
        }}
      />
      <ScrollView style={{
          flex: 1,
          paddingHorizontal: 20,
      }} showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10,
      }}>
        <Image source={icons.logo} style={{
          width: 60,
          height: 45,
          marginTop: 70,
          alignSelf: "center",
          resizeMode: "contain",
        }}/>

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size = "large"
            color="0000ff"
            style = {{
              marginTop: 50,
              alignItems: "center",
            }}  
          />
        ): moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ): (
          <View style={{
            flex: 1,
            marginTop: 20,
          }}>
            <SearchBar 
              onPress={()=>router.push("/search")}
              placeholder = "Search for a movie"
            />

            { trendingmovies && (
              <View style={{marginTop: 10}}>
                <Text style={{
                   fontWeight: "800",
                   color: "white",
                   fontStyle: "normal",
                   marginTop:20,
                   marginBottom: 10,
                }}>Trending Movies</Text>
              </View>
            )}
            <>

              <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View
                    style={{width: 10}}
                />}
                data = {trendingmovies}
                renderItem={({ item, index }) => (
                  <TrendingCars movie={item} index={index}/>
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />
              <Text style = {{
                fontWeight: "800",
                color: "white",
                fontStyle: "normal",
                marginTop:20,
                marginBottom: 10,
              }}>
                Latest Movies
              </Text>

              <FlatList 
                data = {movies}
                renderItem={({ item }) => (
                  <View style ={{
                    width: CARD_WIDTH,
                    marginBottom: 15,
                  }}>
                  <MovieCard
                    {...item}
                  /></View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle = {{
                  display: "flex",
                  justifyContent : "flex-start",
                  gap: 15,
                  paddingLeft: 0,
                  marginBottom: 10
                }}
                style={{
                  marginTop: 10,
                  paddingBottom: 50,
                }}
                scrollEnabled={false}
              />

            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
