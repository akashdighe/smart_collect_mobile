import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, Text} from 'react-native-svg';

const CircularProgress = ({
  size = 100,
  strokeWidth = 10,
  progress,
  color = '#0C1D4F', // Dark blue color
  backgroundColor = '#FFFFFF', // White background color
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="squre"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />

        {/* Percentage Text Inside Circle */}
        <Text
          x={size / 2}
          y={size / 2}
          fontSize={size * 0.18} // Dynamic font size
          fill={color}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight="bold">
          {`${progress}%`}
        </Text>
      </Svg>
    </View>
  );
};

export default CircularProgress;
