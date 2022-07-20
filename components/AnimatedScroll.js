import React, {useState, useEffect, useRef} from 'react';
// import Skeleton from './index.js';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

{
  /* Skeleton component Starts*/
}
const Skeleton = ({width, height, style}) => {
  const translateX = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      }),
    ).start();
  }, [width]);
  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0.12)',
          overflow: 'hidden',
        },

        style,
      ])}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [{translateX: translateX}],
        }}>
        <LinearGradient
          style={{width: '100%', height: '100%'}}
          colors={['transparent', 'rgba(0,0,0,0.05)', 'transparent']}
          start={{x: 1, y: 1}}
        />
      </Animated.View>
    </View>
  );
};

{
  /* Skeleton component Ends*/
}
const BG_IMG =
  'https://media.istockphoto.com/photos/abstract-white-studio-background-for-product-presentation-empty-room-picture-id1322376077?s=612x612';
const ITEM_MARGIN_BOTTOM = 20;
const ITEM_PADDING = 10;
const HEIGHT_IMG = 100;
const ITEM_SIZE = HEIGHT_IMG + ITEM_PADDING * 2 + ITEM_MARGIN_BOTTOM;
const AnimatedScroll = ({data, isLoading}) => {
  const cardWidth = Dimensions.get('window').width;

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const renderItem = ({item, index}) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.6)],
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View
        style={[
          styles.item,
          {
            transform: [{scale}],
            opacity,
          },
        ]}>
        <Image
          style={styles.image}
          source={{uri: item.url}}
          resizeMode="contain"
        />
        <View style={styles.wrapText}>
          <Text style={styles.fontSize}>{item.title}</Text>
          <Text style={styles.fontUrl}>{item.thumbnailUrl}</Text>
        </View>
      </Animated.View>
    );
  };

  const renderShimmey = ({item, index}) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.6)],
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View
        style={[
          styles.shimmeyitem,
          {
            transform: [{scale}],
            opacity,
          },
        ]}>
        <Skeleton
          width={cardWidth * 0.25}
          height={100}
          style={styles.shimmeyimage}
          resizeMode="contain"
        />
        <View style={styles.wrapText}>
          <Skeleton
            width={cardWidth * 0.58}
            height={30}
            style={styles.shimmeyfontSize}
          />
          <Skeleton
            width={cardWidth * 0.58}
            height={30}
            style={styles.shimmeyfontUrl}
          />
        </View>
      </Animated.View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: BG_IMG}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={70}
      />
      {isLoading ? (
        <Animated.FlatList
          data={data}
          keyExtractor={item => `key-${item.id}`}
          renderItem={renderShimmey}
          contentContainerStyle={{
            padding: 20,
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      ) : (
        <Animated.FlatList
          data={data}
          keyExtractor={item => `key-${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 20,
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fontSize: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  fontUrl: {
    fontSize: 12,
    color: 'blue',
  },
  image: {
    width: 100,
    height: HEIGHT_IMG,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  item: {
    flexDirection: 'row',
    marginBottom: ITEM_MARGIN_BOTTOM,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    padding: ITEM_PADDING,
  },

  shimmeyitem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,

    shadowRadius: 20,
    padding: 10,
  },
  shimmeyimage: {
    borderRadius: 8,
  },
  shimmeyfontSize: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 2,
    borderRadius: 8,
  },
  shimmeyfontUrl: {
    fontSize: 12,
    color: 'blue',
    borderRadius: 8,
  },
});

export default AnimatedScroll;
