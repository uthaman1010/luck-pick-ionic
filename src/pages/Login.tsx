import { IonCard, IonCardContent, IonContent, IonFooter, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

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
                <IonCard >
                    <IonCardContent>
                        <form onSubmit={doLogin} >
                            <IonInput label='email'></IonInput>
                        </form>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Login;