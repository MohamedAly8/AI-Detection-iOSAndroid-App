import { View, Text, Switch, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { Camera, CameraType } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';
import { manipulateAsync } from 'expo-image-manipulator';


const Home = () => {
    const [isTfReady, setTfReady] = useState(false);
    const [model, setModel] = useState(null);

    const [cameraOn, setCameraOn] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [numSkittles, setnumSkittles] = useState(6);
    const [numDefect, setnumDefect] = useState(2);
    const [numGreen, setnumGreen] = useState(2);
    const [numYellow, setnumYellow] = useState(1);
    const [numRed, setnumRed] = useState(3);
    const [numOrange, setnumOrange] = useState(0);

    

    // create useRef for imageRef
    const imageRef = useRef();

    

    useEffect(() => {
      (async () => {
        await tf.ready().catch((error) => {
          console.log(error);
        });
        setTfReady(true);

        const model = require('../model/model.json');
        const weights1 = require('../model/group1-shard1of3.bin');
        const weights2 = require('../model/group1-shard2of3.bin');
        const weights3 = require('../model/group1-shard3of3.bin');
        const loadedModel = await tf.loadGraphModel(
          bundleResourceIO(model, [weights1, weights2, weights3])
        ).catch((error) => {
          console.log(error);
        });
  
        setModel(loadedModel);
      })();
    }, []);

    if (!permission){
        return <Text>No permission</Text>
    
    }
    if (!permission.granted){
        requestPermission();
    }


    const handleToggleCamera = () => {
      setCameraOn(!cameraOn);
    };

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    const handleImagePress = async () => {
      const photoAsset = Asset.fromModule(require('../assets/test-imgs/testSkittle1.jpg'));
      
      await photoAsset.downloadAsync();
      const photo = { uri: photoAsset.uri };
      console.log(photo);
      await handleImageCapture(photo);
    };  

    const handleImageCapture = async (photo) => {
      console.log('handlingImageCapture')
      
      const imageAssetPath = photo.uri;

      console.log('imageAssetPath ready')
      console.log(imageAssetPath)
      
      const imageTensor = await imageToTensor(imageAssetPath);
      console.log('back from conversion')
      
      const predictions = await model.predict(imageTensor).data();
      console.log('predictions ready')
      console.log(predictions);
    }
    
    const imageToTensor = async (path) => {
      console.log('converting image to tensor')
      const img = await manipulateAsync(
        path,
        [{ resize: { width: 224, height: 224 } }],
        { format: 'png', compress: 1 }
      );
      const tImg = tf.browser.fromPixels(img).toFloat();
      const offset = tf.scalar(255);
      const normalized = tImg.div(offset);
      const batched = normalized.expandDims(0);
      console.log('done conversion')
      return batched;
    }



      
  
    return (
      <View style={styles.container}>
        <Text>TFJS ready? {isTfReady ? <Text>Yes</Text> : 'No'}</Text>
        <Text>Model ready? {model ? <Text>Yes</Text> : 'No'}</Text>
        <View style={styles.camerasection}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            ref={imageRef}
            source={require('../assets/test-imgs/testSkittle1.jpg')}
            style={styles.image}
              />

        </TouchableOpacity>
       
        </View>
        <View>
          <Switch value={cameraOn} onValueChange={handleToggleCamera} />
        </View>

        <View style={styles.insights}>
            <Text style={styles.insightheader}>Insights</Text>
            <Text style={styles.insighttext}> Number of Skittles: {numSkittles}</Text>
            <Text style={styles.insighttext}> Defected Skittles: {numDefect}</Text>
            <View style={styles.insightscolor}> 
            <Text style={styles.insighttext}> Green: {numGreen}</Text>
            <Text style={styles.insighttext}> Yellow: {numYellow}</Text>
            <Text style={styles.insighttext}> Red: {numRed}</Text>
            <Text style={styles.insighttext}> Orange: {numOrange}</Text>
            </View>


        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camerasection: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    
    camera: {
        width: 400,
        height: 500,
        borderRadius: 30,

    },
    text: {
        fontSize: 18,
        color: 'white',

    },
    imageplaceholder: {
        width: 400,
        height: 400,
    },
    insights: {
        flex: 0.3,
        backgroundColor: '#4B286D',
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        borderRadius: 30,
    },
    insightheader: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    insighttext: {
        fontSize: 18,
        color: 'white',
    },
    insightscolor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        color: 'white',
    },
    image: {
      width: 400,
      height: 400,
        
    }


  });
  

export default Home

