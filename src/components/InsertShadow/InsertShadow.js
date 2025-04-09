import React from 'react';
import InsetShadow from 'react-native-inset-shadow';

const InsetShadowWrapper = props => {
  const {shadowRadius = 10, shadowOpacity = 0.5, ...rest} = props;

  return (
    <InsetShadow
      {...rest}
      shadowRadius={shadowRadius}
      shadowOpacity={shadowOpacity}
    />
  );
};

export default InsetShadowWrapper;
