import React from 'react';
import { IonButton, IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons'
import sunBathing from '../assets/sunbathing.svg'

const Login: React.FC = () => {

    const doLogin = (event: any) => {
        event.preventDefault();
        console.log('dologin')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'} >
                    <IonTitle size='large'>Lucky Pick</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <img src={sunBathing} alt="air-ballon" />
                <IonCard >
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput style={{ 'margin-bottom': '5px' }} fill='outline' labelPlacement='floating' placeholder='email@gmail.com' label='Email' type='email'></IonInput>
                            <IonInput style={{ 'margin-bottom': '5px' }} fill='outline' labelPlacement='floating' label='Password' type='password' ></IonInput>
                            <IonButton type='submit' expand='block' className='ion-margin-top' >Login <IonIcon icon={logInOutline} slot='end' /> </IonButton>
                            <IonButton routerLink='/register' color={'light'} type='button' expand='block' className='ion-margin-top' > Create Account <IonIcon icon={personCircleOutline} slot='end' /></IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;