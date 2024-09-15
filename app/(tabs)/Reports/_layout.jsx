import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from "expo-router"

const AffirmationLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, headerStyle: { backgroundColor: "transparent" } }} />
            <Stack.Screen name="History" options={{ headerShown: false, headerStyle: { backgroundColor: "transparent" } }} />
            {/* <Stack.Screen name="ReportQuestion" /> */}
        </Stack>
    )
}
export default AffirmationLayout