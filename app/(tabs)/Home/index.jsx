import Navbar from '@/components/Navbar';
import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { useRouter } from "expo-router";
import MentalwellBeing from '@/components/home/MentalwellBeing';
import Lesson from '@/components/home/Lesson';


const App = () => {
  const router = useRouter();
  const [selectedButtonId, setSelectedButtonId] = useState(1);
  const [isArpSurveyNotFilled, setIsArpSurveyNotFilled] = useState(false);
  const [hasNotCompletedAnyLessonButFilledSurvey, setHasNotCompletedAnyLessonButFilledSurvey] = useState(false);
  const [hasCompleted2Lessons, setHasCompleted2Lessons] = useState(true);
    const handleIcon1Press = () => {
      if (router && router.push) {
        router.push("/search");
    }
        // router.push("/search")
    };

    const handleIcon2Press = () => {
        console.log('Settings icon pressed');
    };

    const buttons = [
      { id: 1, label: 'Lessons' },
      { id: 2, label: 'Mental WellBeing' },
      { id: 3, label: 'Button 3' },
      { id: 4, label: 'Button 4' },
      { id: 5, label: 'Button 5' },
  ];

  const renderItem = ({ item }) => (
      <View
          className={`mx-2 flex justify-center items-center rounded-xl ${selectedButtonId === item.id ? "bg-[#E6ECF2]" : "bg-[#FFFFFF]"}`}
          // buttonColor={selectedButtonId === item.id ? '#E6ECF2' : '#FFFFFF'} 
          onPress={() => console.log(`${item.label}`)}
      >
        <Text className="px-4 py-2 font-semibold">  {item.label} </Text>
      </View>
  );

    return (
      <SafeAreaView style={styles.container}>
        <View >
            <Navbar
                name="John" 
                onIcon1Press={handleIcon1Press} 
                onIcon2Press={handleIcon2Press} 
            />
            {/* MENU */}
  <FlatList className="h-[80px]"
            horizontal
            showsHorizontalScrollIndicator={false}
            data={buttons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
        />
<View className="w-[100%] h-[79%]">
        {/* <MentalwellBeing></MentalwellBeing> */}

        <Lesson></Lesson>
        </View>
        </View>
        </SafeAreaView>
    );
};

export default App;

const styles = StyleSheet.create({
  container: {
          backgroundColor : 'linear-gradient(180deg, #F6F7FB 0%, #F6F7FB 100%)',
      },
      flatListContainer: {
        paddingVertical: 20,
        paddingHorizontal:5, 
        
    },
    button: {
        width: 120,
        margin: 2,
        borderColor: 'black',
        borderWidth:1,
    },
  })
