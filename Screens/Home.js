import { View, Text, Switch, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import { Camera, CameraType } from 'expo-camera';
import * as tf from '@tensorflow/tfjs';
import {bundleResourceIO, cameraWithTensors } from '@tensorflow/tfjs-react-native';

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
    const cameraRef = useRef(null);
    const TensorCamera = cameraWithTensors(Camera);

  const [prediction, setPredictions] = useState();
    let requestAnimationFrameId = 0;
    let frameCount = 0;
    let makePredictionsEveryNFrame = 1;

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


    useEffect(() => {
      return () => {
        cancelAnimationFrame(requestAnimationFrameId);
      };
    }, [requestAnimationFrameId]);



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
      
    const handleCameraStream = (tensors) => {
        if (!tensors) {
          console.log("Image not found!");
        }
        const loop = async () => {
          if (frameCount % makePredictionsEveryNFrame === 0) {
            const imageTensor = tensors.next().value;
            if (model) {
              const results = await startPrediction(model, imageTensor);
              console.log('results are in')
              setPredictions(results);
              console.log(prediction)
            }
            tf.dispose(tensors); 
          }
          frameCount += 1;
          frameCount = frameCount % makePredictionsEveryNFrame;
          requestAnimationFrameId = requestAnimationFrame(loop);
        };
        loop();
      };

      const startPrediction = async (model, tensor) => {
        try {
          console.log(tensor);

          const preprocessed = tf.tensor(tensor.arraySync()).resizeBilinear([224, 224]).div(255);

          // predict the tensor
          const output = await model.predict(preprocessed, {batchSize: 1});
          
          return output.dataSync(); 
        } catch (error) {
          console.log('Error predicting from tesor image', error);
        }
      };

      let textureDims;
      if (Platform.OS === 'ios') {
        textureDims = {
          height: 1920,
          width: 1080,
        };
      } else {
        textureDims = {
          height: 1200,
          width: 1600,
        };
      }


  
    
    return (
      <View style={styles.container}>
        <Text>TFJS ready? {isTfReady ? <Text>Yes</Text> : 'No'}</Text>
        <Text>Model ready? {model ? <Text>Yes</Text> : 'No'}</Text>
        <View style={styles.camerasection}>
          {cameraOn ? (
            <TensorCamera style={styles.camera} type={type} ref={cameraRef}
              cameraTextureHeight={textureDims.height}
              cameraTextureWidth={textureDims.width}
              resizeHeight={224}
              resizeWidth={224}
              resizeDepth={3}
              onReady={tensors => handleCameraStream(tensors)}
              autorender={true}
            >
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                </View>
            </TensorCamera>
          ) : (
            <Image style={styles.imageplaceholder}
              source={require('../assets/lion.png')}
            />

          )}
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


  });
  

export default Home

