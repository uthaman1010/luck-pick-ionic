import React, { useState } from 'react';
import {
    IonButton, IonButtons, IonContent, IonHeader,
    IonMenuButton, IonPage, IonTitle, IonToolbar
} from '@ionic/react';
import { Camera, CameraResultType } from "@capacitor/camera";

const Tab1: React.FC = () => {

    const [image, setImage] = useState<any>(null)

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64
        })

        const img = `data:image/jpeg;base64,${image.base64String}`;
        setImage(img)
        console.log({ image });

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand='block' onClick={takePicture}>Take Picture</IonButton>
            </IonContent>
            <img src={image} alt="" />
        </IonPage>
    );
};

export default Tab1;