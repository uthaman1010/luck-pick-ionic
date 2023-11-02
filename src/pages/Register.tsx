import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';
import React from 'react';

const Register: React.FC = () => {

    const router = useIonRouter();

    const doRegister = (event: any) => {
        event.preventDefault();
        console.log('doRegister');
        router.goBack()
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'} >
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle className='ion-text-center' size='large'>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen scrollY={false}>
                <IonGrid fixed>
                    <IonRow className='ion-justify-content-center' >
                        <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                            <IonCard >
                                <IonCardContent>
                                    <form onSubmit={doRegister}>
                                        <IonInput style={{ marginBottom: '5px' }} fill='outline' labelPlacement='floating' placeholder='email@gmail.com' label='Email' type='email'></IonInput>
                                        <IonInput style={{ marginBottom: '5px' }} fill='outline' labelPlacement='floating' label='Password' type='password' ></IonInput>
                                        <IonButton type='submit' expand='block' className='ion-margin-top' >Create my account <IonIcon icon={checkmarkDoneOutline} slot='end' /> </IonButton>
                                    </form>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default Register;