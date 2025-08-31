// import React from 'react';
// import { Text, StyleSheet } from 'react-native';
// import MaskedView from '@react-native-masked-view/masked-view';
// import LinearGradient from 'react-native-linear-gradient';
// import { colors } from '../../assets/constants';

// const GradientText = ({ text,size }) => {
//   return (
//     <MaskedView maskElement={<Text style={textStyle}>{text}</Text>}>
//       <LinearGradient
//         colors={[colors.gradient.first,colors.gradient.second,colors.gradient.last]}
//         start={start}
//         end={end}
//         locations={locations}
//         style={style}
//       >
//         {/* The actual text, but hidden, to ensure the LinearGradient takes the correct size */}
//         <Text style={[textStyle, { opacity: 0 ,fontSize:size}]}>{text}</Text>
//       </LinearGradient>
//     </MaskedView>
//   );
// };

// export default GradientText;
// import React from 'react';
// import {Text} from 'react-native';
// import MaskedView from '@react-native-masked-view/masked-view';
// import LinearGradient from 'react-native-linear-gradient';
// import {colors, fonts} from '../../assets/constants';

// const GradientText = ({text, size = 24}) => {
//   const textStyle = {
//     fontSize: size,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     fontFamily:fonts.bold
//   };

//   return (
//     <MaskedView
//       maskElement={
//         <Text style={textStyle}>
//           {text}
//         </Text>
//       }>
//       <LinearGradient
//         colors={[
//           colors.gradient.first,
//           colors.gradient.second,
//           colors.gradient.last,
//         ]}
        
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}>
//         <Text style={[textStyle, {opacity: 0,fontFamily:"Poppins-Bold"}]}>{text}</Text>
//         <Text style={{fontFamily:fonts.bold,color:'black'}}>TEST</Text>
//       </LinearGradient>
//     </MaskedView>
//   );
// };

// export default GradientText;



import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts} from '../../assets/constants';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';


const GradientText = ({text, size = 24}) => {
  const textStyle = {
    fontSize: size,
    fontFamily: fonts.semiBold, // use your constant
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  };

  return (
    <MaskedView
      maskElement={
        <Text style={textStyle}>
          {text}
        </Text>
      }>
      <LinearGradient
        colors={[
          colors.gradient.first,
          colors.gradient.second,
          colors.gradient.last,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 0.7, y: 0}}>
        <Text style={[textStyle, {opacity: 0}]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;