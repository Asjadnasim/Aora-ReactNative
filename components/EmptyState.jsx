import { View, Text, Image } from 'react-native';
import React from 'react';

import { images } from '../constants';

import CustomButton from './CustomButton';
import { router } from 'expo-router';

const EmptyState = ({ title, subTitle }) => {
	return (
		<View className='justify-center items-center px-4'>
			<Image
				source={images.empty}
				className='w-[270px] h-[215px]'
				resizeMode='contain'
			/>

			<Text className='text-2xl font-psemibold text-white  text-center mt-2'>
				{title}
			</Text>
			<Text className='font-pmedium text-sm text-gray-100 mt-2'>
				{subTitle}
			</Text>

			<CustomButton
				title={'Create Video'}
				handlePress={() => router.push('/create')}
				containerStyles={'w-full my-5'}
			/>
		</View>
	);
};

export default EmptyState;
