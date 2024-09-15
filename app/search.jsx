import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Refresh from "../assets/images/refresh.svg";
import SlantUpperArrow from "../assets/images/slantUpperArrow.svg";
import ListComponent from "@/components/home/ListComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  searchKeywordAsync,
  selectisResultRecieved,
  selectlessonData,
  selectmediaData,
  selectResult,
  selectTopics,
} from "@/features/search/searchSlice";

const DATA$ = [
  {
    lessonData: [
      {
        courseId: "course1",
        createdAt: "2024-09-13T19:08:44.319Z",
        description: "what goes inside victims mind",
        lessonId: "lesson7",
        sequenceNumber: 4,
        title: "mental aspects of bullying",
        updatedAt: "2024-09-13T19:08:44.319Z",
      },
      {
        courseId: "course1",
        createdAt: "2024-09-13T19:08:44.319Z",
        description:
          "the lesson explains you measures u can take to protect yourself",
        lessonId: "lesson5",
        sequenceNumber: 3,
        title: "what to do when u are being bullied",
        updatedAt: "2024-09-13T19:08:44.319Z",
      },
      {
        courseId: "course1",
        createdAt: "2024-09-13T19:08:44.319Z",
        description:
          "This lesson explains different types of bullying at different places like schools, workplace, etc",
        lessonId: "lesson3",
        sequenceNumber: 2,
        title: "How bullying happens at different places",
        updatedAt: "2024-09-13T19:08:44.319Z",
      },
      {
        courseId: "course1",
        createdAt: "2024-09-13T19:08:44.319Z",
        description: "This explains what is bullying",
        lessonId: "lesson1",
        sequenceNumber: 1,
        title: "what is bullying?",
        updatedAt: "2024-09-13T19:08:44.319Z",
      },
    ],
    mediaData: [
      {
        author: "Pranjal",
        category: "Mental wellbeing",
        courseId: "",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "you are a bully?",
        lessonId: "",
        mediaId: "media6",
        path: "/path/to/document1",
        sequenceNumber: null,
        thumbnailImage: "/path/to/thumb2",
        titleName: "you are a bully?",
        type: "document",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "Harsh",
        category: "Mental wellbeing",
        courseId: "",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "how to be a bully",
        lessonId: "",
        mediaId: "media5",
        path: "/path/to/video1",
        sequenceNumber: null,
        thumbnailImage: "/path/to/thumb1",
        titleName: "how to be a bully",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "ankur",
        category: "Celebrity",
        courseId: "",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "Bully bully bully",
        lessonId: "",
        mediaId: "media7",
        path: "/path/to/video1",
        sequenceNumber: null,
        thumbnailImage: "/path/to/thumb1",
        titleName: "Bully bully bully",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "Pranjal",
        category: "Science",
        courseId: "course2",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "harsh is bully",
        lessonId: "lesson2",
        mediaId: "media4",
        path: "/path/to/document1",
        sequenceNumber: 2,
        thumbnailImage: "/path/to/thumb2",
        titleName: "harsh is bully",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "Tushar",
        category: "lesson",
        courseId: "course1",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "what is bully",
        lessonId: "lesson1",
        mediaId: "media1",
        path: "/path/to/video1",
        sequenceNumber: 1,
        thumbnailImage: "/path/to/thumb1",
        titleName: "what is bully",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "shobhit",
        category: "Celebrity",
        courseId: "",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "What is bullyproof?",
        lessonId: "",
        mediaId: "media8",
        path: "/path/to/document1",
        sequenceNumber: null,
        thumbnailImage: "/path/to/thumb2",
        titleName: "What is bullyproof",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "Tushar",
        category: "Science",
        courseId: "lesson",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "why is bully?",
        lessonId: "lesson2",
        mediaId: "media2",
        path: "/path/to/video1",
        sequenceNumber: 1,
        thumbnailImage: "/path/to/thumb2",
        titleName: "why is bully?",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
      {
        author: "Tushar",
        category: "lesson",
        courseId: "course1",
        createdAt: "2024-09-13T19:08:44.343Z",
        description: "Who is bully",
        lessonId: "lesson1",
        mediaId: "media3",
        path: "/path/to/video1",
        sequenceNumber: 2,
        thumbnailImage: "/path/to/thumb1",
        titleName: "Who is bully",
        type: "video",
        updatedAt: "2024-09-13T19:08:44.343Z",
      },
    ],
    success: true,
  },
];

const DATA = [
  {
    id: "1",
    photoUrl: "https://reactnative.dev/img/tiny_logo.png",
    title: "First Item ",
    description:
      "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor",
    time: "2:30",
  },
  {
    id: "2",
    photoUrl: "https://reactnative.dev/img/tiny_logo.png",
    title: "Second Item ",
    description:
      "Lorem ipsum dolor sit amet, consectetur dipiscing elit, sed do eiusmod tempor",
    time: "3:40",
  },
];

const Item1 = ({ id, photoUrl, title, description, time }) => (
  <View className="h-[40px] w-[100%] flex-row items-center pl-[5%]">
    <Refresh></Refresh>
    <Text className="ml-[5%] font-semibold">Bullying</Text>
  </View>
);

const Item2 = ({ id, photoUrl, title, description, time }) => (
  <View className="h-[40px] w-[100%] flex-row items-center pl-[5%]">
    <SlantUpperArrow></SlantUpperArrow>
    <Text className="ml-[5%] font-semibold">Bullying</Text>
  </View>
);

const Item4 = ({ id, topic, onPress, isSelected }) => (
  <TouchableOpacity onPress={() => onPress(topic)}>
    <View
      className={`mx-[10px] ${
        isSelected ? "bg-red-200" : "bg-white"
      } rounded-2xl h-[100%] flex items-center justify-center px-[10px]`}
    >
      <Text>{topic}</Text>
    </View>
  </TouchableOpacity>
);

export default function search() {
  const router = useRouter();
  const dispatch = useDispatch();
  const result = useSelector(selectResult);
  const lessonData = useSelector(selectlessonData);
  const mediaData = useSelector(selectmediaData);
  const isResultRecieved = useSelector(selectisResultRecieved);
  const searchResponseTopics = useSelector(selectTopics);
  console.log("==================result=============", result);
  // console.log("==================mediaData=============", result.mediaData);
  // console.log("==================searchResponseTopics=============", searchResponseTopics);

  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searched , setSearched] = useState(false)
  const handleTopicPress = (topic) => {
    setSelectedTopic(topic);
  };

  const filteredData =
    selectedTopic === "All"
      ? [...mediaData, ...lessonData] 
      : selectedTopic === "lesson"
      ? lessonData 
      : mediaData.filter((item) => item.category.includes(selectedTopic)); 


  return (
    <View>
      <View className="mt-[12%] ml-[5%] flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            }
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-row  bg-white h-[30px] ml-[4%] pl-[1%] w-[84%] rounded-md">
          <TouchableOpacity
            onPress={() => {
              dispatch(searchKeywordAsync(keyword));
              setKeyword("")
              setSearched(true)
            }}
          >
            <EvilIcons name="search" size={27} color="black" />
          </TouchableOpacity>
          <TextInput
            className=" ml-[1%] w-[92%]"
            onChangeText={setKeyword}
            value={keyword}
            placeholder="Search by author/video/document name "
          />
        </View>
      </View>
      {!searched && (
        <>
          <FlatList
            className="w-[100%]  bg-white mt-[30px]"
            data={DATA}
            ListHeaderComponent={
              <Text className="ml-[5%] mt-[10px] font-light">
                Recent Searches
              </Text>
            }
            renderItem={({ item }) => <Item1 />}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            className="w-[100%]  bg-white mt-[10px]"
            data={DATA}
            ListHeaderComponent={
              <Text className="ml-[5%] mt-[10px] font-light">
                Try These Searches
              </Text>
            }
            renderItem={({ item }) => <Item2 />}
            keyExtractor={(item) => item.id}
          />
        </>
      )}

      {searched && (
        <>
          <FlatList
            className=" h-[35px] mt-[20px]"
            horizontal
            showsHorizontalScrollIndicator={false}
            data={searchResponseTopics}
            renderItem={({ item, i }) => (
              <Item4
                topic={item}
                onPress={handleTopicPress}
                isSelected={item.topic === selectedTopic}
              />
            )}
            keyExtractor={(item,i) => i.toString()}
          />

{selectedTopic === "All" ? (
      <FlatList className="mb-[30px]"
        data={searchResponseTopics.filter((topic) => topic !== "All")} 
        renderItem={({ item }) => {
          const filteredData =
      item === "lesson" 
        ? lessonData 
        : mediaData.filter((mediaItem) =>
            mediaItem.category.includes(item)
          ); 
          return <ListComponent key={item} title={item} data1={filteredData} />;
        }}
        keyExtractor={(item) => item.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    ) : (
      <ListComponent title={selectedTopic} data1={filteredData} />
    )}

    </>
      )}
    </View>
  );
}
