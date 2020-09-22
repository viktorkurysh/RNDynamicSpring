import React from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';

const {width} = Dimensions.get('window');
const CARD_ASPECT_RATIO = 1324 / 863;
export const CARD_WIDTH = width - 8 * 8;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export const cards = [
  {
    id: 0,
    source: require('RNDynamicSpring/assets/card1.png'),
  },
  {
    id: 1,
    source: require('RNDynamicSpring/assets/card2.png'),
  },
  {
    id: 2,
    source: require('RNDynamicSpring/assets/card3.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 18,
  },
  flexibleContainer: {
    flex: 1,
    maxWidth: '100%',
    aspectRatio: CARD_ASPECT_RATIO,
    margin: 8,
    borderRadius: 18,
    resizeMode: 'contain',
  },
});

const Card = ({card}) => {
  return <Image style={styles.container} source={card.source} />;
};

export default Card;
