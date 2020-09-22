import React from 'react';
import {
  SaveAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {Value} from 'react-native-reanimated';
import {onGestureEvent} from 'react-native-redash/lib/module/v1';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import Card, {cards, CARD_WIDTH, CARD_HEIGHT} from './Card';
import {withSpring} from './withSpring';

const [card] = cards;

const {width, height} = Dimensions.get('window');
const containerWidth = width;
const containerHeight = height - getStatusBarHeight() - 44;
const snapX = (containerWidth - CARD_WIDTH) / 2;
const snapY = (containerHeight - CARD_HEIGHT) / 2;
const offsetX = new Value(snapX);
const offsetY = new Value(snapY);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0080FF',
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#0080FF',
    height: 75,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFF',
  },
  body: {
    width: '100%',
    flex: 1,
    backgroundColor: '#FFF',
  },
});

function App() {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const gestureHandler = onGestureEvent({
    translationX,
    translationY,
    velocityX,
    velocityY,
    state,
  });

  const translateX = withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    offset: offsetX,
    snapPoints: [snapX],
  });
  const translateY = withSpring({
    value: translationY,
    velocity: velocityY,
    state,
    offset: offsetY,
    snapPoints: [snapY],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0080FF" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dynamic Spring</Text>
      </View>
      <View style={styles.body}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={{
              transform: [{translateX}, {translateY}],
            }}>
            <Card {...{card}} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  );
}

export default App;
