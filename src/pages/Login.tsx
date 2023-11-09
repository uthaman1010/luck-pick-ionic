import React, { useEffect, useState } from 'react';
import {
    IonButton, IonCard, IonCardContent, IonCol, IonContent,
    IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle,
    IonToolbar, useIonLoading, useIonRouter
} from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons'
import { Preferences } from "@capacitor/preferences";
import sunBathing from '../assets/sunbathing.svg'
import Intro from '../components/Intro';

const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {

    const router = useIonRouter();
    const [introSeen, setIntroSeen] = useState(false)
    const [present, dismiss] = useIonLoading()

    useEffect(() => {
        checkStorage()
    }, [])

    const checkStorage = async () => {
        const seen = await Preferences.get({ key: INTRO_KEY })
        setIntroSeen(seen.value === 'true')
    }

    const finishIntro = async () => {
        setIntroSeen(true)
        Preferences.set({ key: INTRO_KEY, value: 'true' })
    }

    const doLogin = async (event: any) => {
        event.preventDefault();
        await present('Logging in...')
        setTimeout(() => {
            dismiss()
            router.push('/menu', 'forward')
        }, 2000);
    }

    const seeIntroAgain = () => {
        setIntroSeen(false);
        Preferences.remove({ key: INTRO_KEY })
    }


    return (
        <>
            {
                !introSeen ? (
                    <Intro onFinish={finishIntro} />
                ) : (
                    <IonPage>
                        <IonHeader>
                            <IonToolbar color={'success'} >
                                <IonTitle className='ion-text-center' size='large'>Lucky Pick</IonTitle>
                            </IonToolbar>
                        </IonHeader>
                        <IonContent fullscreen scrollY={false} className='ion-padding'>
                            <IonGrid fixed>
                                <IonRow className='ion-justify-content-center' >
                                    <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                        <div className='ion-text-center ion-padding'>
                                            <img src={sunBathing} alt="sun-bathing" width={'50%'} />
                                        </div>
                                    </IonCol>
                                </IonRow>
                                <IonRow className='ion-justify-content-center'>
                                    <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4' >
                                        <IonCard >
                                            <IonCardContent>
                                                <form onSubmit={(e) => doLogin(e)}>
                                                    <IonInput mode='md' style={{ marginBottom: '5px' }} fill='outline' labelPlacement='floating' placeholder='email@gmail.com' label='Email' type='email'></IonInput>
                                                    <IonInput mode='md' style={{ marginBottom: '5px' }} fill='outline' labelPlacement='floating' label='Password' type='password' ></IonInput>
                                                    <IonButton type='submit' expand='block' className='ion-margin-top' >Login <IonIcon icon={logInOutline} slot='end' /> </IonButton>
                                                    <IonButton routerLink='/register' color={'light'} type='button' expand='block' className='ion-margin-top' > Create Account <IonIcon icon={personCircleOutline} slot='end' /></IonButton>
                                                    <IonButton onClick={seeIntroAgain} fill='clear' size='small' color={'medium'} type='button' expand='block' className='ion-margin-top' > Watch Intro Again <IonIcon icon={personCircleOutline} slot='end' /></IonButton>
                                                </form>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonContent>
                    </IonPage>
                )

            }
        </>
    );
};

export default Login;