import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import OneSignal from 'react-native-onesignal';

const App = () => {

    useEffect(() => {
        CallOneSignal(); 
    }, []);

    const CallOneSignal = () => {

        console.log('Page Load..');
        
        //OneSignal Init Code
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId("103865c4-b4c5-4546-ad11-591726556807");
        //END OneSignal Init Code
        OneSignal.provideUserConsent(true);
        OneSignal.setRequiresUserPrivacyConsent(true);
        //Prompt for push on iOS
        OneSignal.promptForPushNotificationsWithUserResponse(response => {
            console.log("Prompt response:", response);
        });

        //Method for handling notifications received while app in foreground
        OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
            console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
            let notification = notificationReceivedEvent.getNotification();
            console.log("notification: ", notification);
            const data = notification.additionalData
            console.log("additionalData: ", data);
            // Complete with null means don't show a notification.
            notificationReceivedEvent.complete(notification);
        });

        //Method for handling notifications opened
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={{color: '#fff', marginBottom: 15, fontSize: 35}}>Hello world!</Text>
            <Text style={{color: '#fff'}}>App ready for use.</Text>

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default App;


/*
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const MyComponent = () => {
    return (
        <View style={styles.container}>
            <Text>MyComponent</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MyComponent;
*/