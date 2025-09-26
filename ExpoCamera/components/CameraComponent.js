import React, {useState, useEffect, useRef} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import {CameraView, useCameraPermissions} from "expo-camera"

function CameraComponent(){

    // estado para definir camera frontal ou traseira "front" ou "back"
    const [facing, setFacing] = useState('back')

    // hook expo para fazer permissão
    // permission = estado da permissão
    //requestPermission = função que solicita permissão
    const [permission, requestPermission] = useCameraPermissions()

    // estado para guardar a foto capturada
    const [capturedPhoto, setCapturedPhoto] = useState(null)

    // acesso direto aos metodos da camera
    const cameraRef = useRef(null)

    // executa quando componente é montado
    useEffect(() => {
        requestPermission()
    },[])

    if (!permission) {
        return <View></View>
    }
    if (!permission.granted) {
        return (
            <View>
                <Text>
                    Permissão para acessar a camera
                </Text>
                <Button onPress={requestPermission} title="conceder permissao"/>
            </View>
        )
    }

    // alterna camera 'back' e 'front'
    function toggleCameraFacing(){
        setFacing(current => (current === 'back' ? 'front' : 'back'))
    }

    // tira a foto
    async function takePicture(){
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setCapturedPhoto(photo)
            console.log(photo.uri)
        }
    }

    if (capturedPhoto) {
        return(
            <View>
                <View>
                    <Button title="tirar outra foto" onPress={() => setCapturedPhoto(null)}/>
                </View>
                <Image source={{uri:capturedPhoto.uri}}/>
            </View>
        )
    }

    return(
        <View>
            <CameraView facing={facing} ref={cameraRef}>
                <TouchableOpacity onPress={toggleCameraFacing}>
                    <Text>
                        Trocar Câmera
                    </Text>
                    <TouchableOpacity onPress={takePicture}>
                        <Text>Tirar Foto</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </CameraView>
        </View>
    )

}export default CameraComponent

//estilos
const style = StyleSheet.create({
    tirar_outra: {marginTop: 50},
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    camera : {flex: 1},
    buttonContainer : {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    button : {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64
    },
    text : {
        fontSize: 25,
        fontWeight: "bold",
        color: "white"
    },
    preview : {
        flex: 1,
        resizeMode: 'contain'
    }
}) 