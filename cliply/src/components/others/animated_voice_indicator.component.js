import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { theme } from "../../infrastructure/theme";

const WaveContainer = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* width: 10%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center; */
`;

const Pill = styled(Animated.View)`
  width: 3px;
  border-radius: 10px;
  margin-horizontal: 2px;
  background-color: ${({ active }) =>
    active ? theme.colors.ui.primary : "#BDBDBD"};
`;

export const Animated_Voice_Indicator = ({ recordingStatus }) => {
  const bars = Array.from({ length: 30 });

  const animations = useRef(bars.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (!recordingStatus) {
      animations.forEach((anim) => {
        Animated.timing(anim, {
          toValue: 0.3,
          duration: 250,
          useNativeDriver: false,
        }).start();
      });
      return;
    }

    const loops = animations.map((anim, index) => {
      const distanceFromCenter = Math.abs(index - bars.length / 2);
      const delay = distanceFromCenter * 25;

      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 1 + 0.5,
            duration: 350,
            delay,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 350,
            useNativeDriver: false,
          }),
        ])
      );
    });

    loops.forEach((loop) => loop.start());

    return () => {
      loops.forEach((loop) => loop.stop());
    };
  }, [recordingStatus]);

  return (
    <WaveContainer>
      {bars.map((_, index) => {
        const height = animations[index].interpolate({
          inputRange: [0.3, 1.5],
          outputRange: [8, 34],
        });

        const opacity = animations[index].interpolate({
          inputRange: [0.3, 1.5],
          outputRange: [0.35, 1],
        });

        return (
          <Pill
            key={index}
            active={recordingStatus}
            style={{
              height,
              opacity,
            }}
          />
        );
      })}
    </WaveContainer>
  );
};
