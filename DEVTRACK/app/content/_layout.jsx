import { Tabs } from 'expo-router';


const ContentLayout = () => {
  return(
      <Tabs>
        <Tabs.Screen name="page1" options={{headerShown:false}}/>
        <Tabs.Screen name="page2" options={{headerShown:false}}/>
      </Tabs>
  );
}

export default ContentLayout;