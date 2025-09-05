// import { useLocalSearchParams, useRouter } from "expo-router";
// import {
//   ActivityIndicator,
//   Image,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { icons } from "@/constants/icons";
// import { fetchMovieDetails } from "@/services/api";
// import useFetch from "@/services/useFetch";

// interface MovieInfoProps {
//   label: string;
//   value?: string | number | null;
// }

// const MovieInfo = ({ label, value }: MovieInfoProps) => (
//   <View className="flex-col items-start justify-center mt-5">
//     <Text className="text-light-200 font-normal text-sm">{label}</Text>
//     <Text className="text-light-100 font-bold text-sm mt-2">
//       {value || "N/A"}
//     </Text>
//   </View>
// );

// const Details = () => {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();

//   const { data: movie, loading } = useFetch(() =>
//     fetchMovieDetails(id as string)
//   );

//   if (loading)
//     return (
//       <SafeAreaView className="bg-primary flex-1">
//         <ActivityIndicator />
//       </SafeAreaView>
//     );

//   return (
//     <View style = {{
//         flex: 1,
//         backgroundColor: '#030014'
//     }}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
//         <View className="px-5 mt-5">
//           <Image
//             source={{
//              uri : movie?.poster_path 
//                 ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
//                 : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
//             }}
//             className="w-full h-[550px]"
//             resizeMode="cover"
//           />

//           <TouchableOpacity className="absolute bottom-5 right-5 rounded-full w-14 h-14 bg-white flex items-center justify-center z-10">
//             <Image
//               source={icons.play}
//               className="w-6 h-7 ml-1"
//               resizeMode="contain"
//             />
//           </TouchableOpacity>
//         </View>

//         <View className="flex-col items-start justify-center mt-5 px-5">
//           <Text className="text-white font-bold text-xl">{movie?.title}</Text>
//           <View className="flex-row items-center gap-x-1 mt-2">
//             <Text className="text-light-200 text-sm">
//               {movie?.release_date?.split("-")[0]} •
//             </Text>
//             <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
//           </View>

//           <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
//             <Image source={icons.star} className="size-4" />

//             <Text className="text-white font-bold text-sm">
//               {Math.round(movie?.vote_average ?? 0)}/10
//             </Text>

//             <Text className="text-light-200 text-sm">
//               ({movie?.vote_count} votes)
//             </Text>
//           </View>

//           <MovieInfo label="Overview" value={movie?.overview} />
//           <MovieInfo
//             label="Genres"
//             value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
//           />

//           <View className="flex flex-row justify-between w-1/2">
//             <MovieInfo
//               label="Budget"
//               value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
//             />
//             <MovieInfo
//               label="Revenue"
//               value={`$${Math.round(
//                 (movie?.revenue ?? 0) / 1_000_000
//               )} million`}
//             />
//           </View>

//           <MovieInfo
//             label="Production Companies"
//             value={
//               movie?.production_companies?.map((c) => c.name).join(" • ") ||
//               "N/A"
//             }
//           />
//         </View>
//       </ScrollView>

//       <TouchableOpacity
//         className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
//         onPress={() => router.back()}
//       >
//         <Image
//           source={icons.arrow}
//           className="size-5 mr-1 mt-0.5 rotate-180"
//           tintColor="#fff"
//         />
//         <Text className="text-white font-semibold text-base">Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Details;
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: 20 }}>
    <Text style={{ color: '#d1d5db', fontWeight: 'normal', fontSize: 14 }}>{label}</Text>
    <Text style={{ color: '#f9fafb', fontWeight: 'bold', fontSize: 14, marginTop: 8 }}>
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading, error } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#030014', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#fff" size="large" />
      </SafeAreaView>
    );
  }

  if (error || !movie) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#030014', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Failed to load movie details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#030014' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Poster + Play Button */}
        <View style={{ position: 'relative' }}>
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            style={{ width: '100%', height: 550 }}
            resizeMode="cover"
          />

          <TouchableOpacity style={{ 
            position: 'absolute', 
            bottom: 20, 
            right: 20, 
            width: 56, 
            height: 56, 
            backgroundColor: 'white', 
            borderRadius: 28, 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 10 
          }}>
            <Image
              source={icons.play}
              style={{ width: 24, height: 28, marginLeft: 4 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Movie Details */}
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 24 }}>{movie.title}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <Text style={{ color: '#d1d5db', fontSize: 14 }}>
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"} •
            </Text>
            <Text style={{ color: '#d1d5db', fontSize: 14 }}>{movie.runtime ?? "N/A"}m</Text>
          </View>

          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            backgroundColor: '#1f2937', 
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            borderRadius: 6, 
            gap: 4, 
            marginTop: 8 
          }}>
            <Image source={icons.star} style={{ width: 16, height: 16 }} />
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>
              {Math.round(movie.vote_average ?? 0)}/10
            </Text>
            <Text style={{ color: '#d1d5db', fontSize: 14 }}>
              ({movie.vote_count ?? 0} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie.overview} />
          <MovieInfo
            label="Genres"
            value={movie.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
            <MovieInfo
              label="Budget"
              value={`$${((movie.budget ?? 0) / 1_000_000).toFixed(1)} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${((movie.revenue ?? 0) / 1_000_000).toFixed(1)} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie.production_companies?.map((c) => c.name).join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>

      {/* Go Back Button */}
      <TouchableOpacity
        style={{ 
          position: 'absolute', 
          bottom: 20, 
          left: 20, 
          right: 20, 
          marginHorizontal: 20, 
          backgroundColor: '#eab308', 
          borderRadius: 12, 
          padding: 14, 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 50 
        }}
        onPress={() => router.back()}
      >
        <Image
          source={icons.arrow}
          style={{ width: 20, height: 20, marginRight: 8, transform: [{ rotate: '180deg' }] }}
          tintColor="#fff"
        />
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;