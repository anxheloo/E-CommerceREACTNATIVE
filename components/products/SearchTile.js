
import React from 'react'
import { StyleSheet,View, Text, TouchableOpacity,Image } from 'react-native'
import { COLORS, SHADOWS, SIZES } from "../.././constants";
import {useNavigation} from '@react-navigation/native'

const SearchTile = ({item})=>{

    const navigation = useNavigation();


    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate('ProductDetails', {item})}}>
                <View style={styles.image}>
                    <Image source={{uri:item.imageUrl}} style={styles.productImage}></Image>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                     <Text style={styles.supplier}>{item.supplier}</Text>
                     <Text style={styles.supplier}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:SIZES.small,
        flexDirection:'row',
        padding:SIZES.medium,
        borderRadius:SIZES.small,
        backgroundColor:'#FFF', ...SHADOWS.medium,
        shadowColor:COLORS.lightWhite
    },

    image:{
        width:70,
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.medium,
        justifyContent:'center',
        alignItems:'center'
    },

    productImage:{
        width:'100%',
        height:65,
        borderRadius:SIZES.small,
        resizeMode:'cover'
    },

    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium
    },

    productTitle:{
        fontFamily:'bold',
        fontSize:SIZES.medium,
        color:COLORS.primary
    },
    supplier:{
       fontFamily:'regular',
        fontSize:SIZES.small +2,
        color:COLORS.gray,
        marginTop:3,
    }
})

export default SearchTile