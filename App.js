import React, {useState, useEffect} from 'react';
import AnimatedScroll from './components/AnimatedScroll';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    getListData();
  }, []);

  const getListData = () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/photos';
    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        setData(resJson);
      })
      .catch(error => {
        console.log('Get list data api error', error);
      })
      .finally(() => setisLoading(false));
  };
  console.log(data);

  return (<AnimatedScroll data={data} isLoading={isLoading}></AnimatedScroll>);
};

const styles = StyleSheet.create({});

export default App;
