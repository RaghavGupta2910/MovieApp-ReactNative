import { Link } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

const TrendingCars = ({ movie: { movie_id, title, poster_url}, index}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity style={{
            width: 120,
            paddingLeft: '5%'
        }}>
            <Image 
                source={{ uri: poster_url}} 
                style={{
                    width: 120,
                    height: 180,
                    borderRadius: 8,
                    resizeMode: 'cover'
                }}
            />
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCars

const styles = StyleSheet.create({})