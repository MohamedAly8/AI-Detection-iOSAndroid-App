import { View, Text, Switch, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Camera, CameraType } from 'expo-camera';
// import tfjs and

const Home = () => {
    const [cameraOn, setCameraOn] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [numSkittles, setnumSkittles] = useState(6);
    const [numDefect, setnumDefect] = useState(2);
    const [numGreen, setnumGreen] = useState(2);
    const [numYellow, setnumYellow] = useState(1);
    const [numRed, setnumRed] = useState(3);
    const [numOrange, setnumOrange] = useState(0);


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
  
    return (
      <View style={styles.container}>
        
        <View style={styles.camerasection}>
          {cameraOn ? (
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                </View>
            </Camera>
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

