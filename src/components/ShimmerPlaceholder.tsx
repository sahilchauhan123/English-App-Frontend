// ShimmerPlaceholder.tsx
import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

interface ShimmerProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  children?: ReactNode;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width = 100,
  height = 20,
  borderRadius = 8,
  style,
  visible = false,
  children,
}) => {
  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      visible={visible}
      style={[styles.shimmer, { width, height, borderRadius }, style]}
      shimmerStyle={{ borderRadius }}
    >
      {children ? <View>{children}</View> : null}
    </ShimmerPlaceHolder>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: "#E1E9EE",
    marginVertical: 6,
  },
});

export default Shimmer;
