import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

import styles from '../styles/styles';

function SimpleCard(props: any) {
	return(
		<TouchableOpacity onPress={props.onPress}>
			<View style={[styles.container, {backgroundColor: props.backgroundColor}]} >
				<CustomText style={styles.title}>{props.title}</CustomText>
				<CustomText style={styles.description}>{props.description}</CustomText>
			</View>
		</TouchableOpacity>
	);
}

export default SimpleCard;