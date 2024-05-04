import { View, Text } from 'react-native';
import React from 'react';

const InfoBox = ({ title, subTitle, containerStyles, titleStyles }) => {
	return (
		<View className={containerStyles}>
			<Text className={`text-white text-center font-psemibold  ${titleStyles}`}>
				{title}
			</Text>
			<Text className='text-sm text-gray-100 font-pregular text-center'>
				{subTitle}
			</Text>
		</View>
	);
};

export default InfoBox;
