import { CustomText } from 'app_components/commons/customs/components/customComponents';
import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import styles from '../styles';

export interface ISvgComponent {
  color: string;
  style ?: any;
  number: number;
}

function SvgComponent(props: ISvgComponent) {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      width="80.806"
      height="91"
      viewBox="0 0 80.806 91"
      style={props.style}
    >
      <G
        id="Componente_2_1"
        data-name="Componente 2 – 1"
        transform="translate(0.5 0.5)">
        <Path
          id="Intersección_24"
          data-name="Intersección 24"
          d="M2613.859,269.444c-8.054,0-14.584-4.452-14.584-9.944v-62.95c11.638.945,19.7-4.062,26.968-9.07,4.635-3.193,8.948-6.385,13.667-8.035h13.111c20.272,6.893,41.612,43.514,9.865,72.451a112.88,112.88,0,0,1-25.681,17.549Z"
          transform="translate(-2599.276 -179.444)"
          fill={props?.color}
          stroke="rgba(0,0,0,0)"
          stroke-miterlimit="10"
          stroke-width="1"
          opacity="0.9"
        />
        <CustomText style={styles.figureNumberCenter}> {props?.number} </CustomText>
      </G>
    </Svg>
  );
}

export default SvgComponent;
