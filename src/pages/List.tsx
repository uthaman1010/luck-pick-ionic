import React, { useEffect, useRef, useState } from 'react';
import {
    IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonChip,
    IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg,
    IonItem, IonLabel, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSegment, IonSegmentButton, IonSkeletonText,
    IonTitle, IonToolbar, useIonAlert, useIonToast, useIonViewWillEnter
} from '@ionic/react';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import '../css/List.css'

const List: React.FC = () => {

    const [presentingElemant, setPresentingElemant] = useState<HTMLElement | null>(null)
    const [activeSegment, setActiveSegment] = useState<any>('details')
    const [selectedUser, setSelectedUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [users, setUsers] = useState<any[]>([])

    const cardModal = useRef<HTMLIonModalElement>(null)
    const modal = useRef<HTMLIonModalElement>(null)
    const page = useRef(null)

    const [showAlert] = useIonAlert()
    const [ShowToast] = useIonToast()

    useEffect(() => {
        setPresentingElemant(page.current)
    }, [])

    useIonViewWillEnter(async () => {
        const users = await getUsers()
        setLoading(false)
        setUsers(users.results)
    })

    const getUsers = async () => {
        const data = (await fetch('https://randomuser.me/api?results=10')).json()
        return data
    }

    const clearList = async () => {
        showAlert({
            header: 'Confirm!',
            message: 'Are you sure you want to delete all users?',
            buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                    text: 'Delete', handler: () => {
                        setUsers([])
                        ShowToast({
                            message: 'All users deleted',
                            duration: 2000,
                            color: 'danger',
                        })
                    }
                }
            ]
        })
    }

    const doRefresh = async (event: any) => {
        // console.log({ event });
        const data = await getUsers()
        setUsers(data.results)
        event.detail.complete()
    }

    return (
        <IonPage ref={page} >
            <IonHeader>
                <IonToolbar color={'success'}>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle className='ion-text-center'>List</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={clearList}>
                            <IonIcon slot='icon-only' icon={trashBinOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
                <IonToolbar color={'success'}>
                    <IonSearchbar />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot='fixed' onIonRefresh={(ev) => doRefresh(ev)} >
                    <IonRefresherContent />
                </IonRefresher>
                {loading &&
                    [...Array(10)].map((_, index) => (
                        <IonCard key={index}>
                            <IonCardContent className='ion-no-padding' >
                                <IonItem style={{ borderStyle: 'none !important' }} lines='none' >
                                    <IonAvatar slot='start'>
                                        <IonSkeletonText />
                                    </IonAvatar>
                                    <IonLabel>
                                        <IonSkeletonText animated style={{ width: '150px' }} />
                                        <p><IonSkeletonText /></p>
                                    </IonLabel>
                                    <IonChip slot='end' color='primary'></IonChip>
                                </IonItem>
                            </IonCardContent>
                        </IonCard>
                    ))}
                {users.map((user, index) => (
                    <IonCard key={index} onClick={() => setSelectedUser(user)}>
                        <IonCardContent className='ion-no-padding' >
                            <IonItem style={{ borderStyle: 'none !important' }} lines='none' >
                                <IonAvatar slot='start'>
                                    <IonImg src={user.picture.thumbnail} />
                                </IonAvatar>
                                <IonLabel>
                                    {user.name.first} {user.name.last}
                                    <p>{user.email}</p>
                                </IonLabel>
                                <IonChip slot='end' color='primary'>{user.nat}</IonChip>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                ))}
                <IonModal breakpoints={[0, 0.25, 0.75, 0.8]} initialBreakpoint={0.75} ref={modal} isOpen={selectedUser !== null} onIonModalDidDismiss={() => setSelectedUser(null)} >
                    <IonHeader>
                        <IonToolbar color={'light'}>
                            <IonButtons slot='start'>
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>{selectedUser?.name?.first} {selectedUser?.name?.last}</IonTitle>
                        </IonToolbar>
                        <IonToolbar color={'light'}>
                            <IonSegment value={activeSegment} onIonChange={(e) => setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value='details'>Details</IonSegmentButton>
                                <IonSegmentButton value='calendar'>Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className='ion-padding'>
                        {activeSegment === 'details' && (
                            <IonCard>
                                <IonCardContent className='ion-no-padding'>
                                    <IonItem lines='none'>
                                        <IonAvatar slot='start'>
                                            <IonImg src={selectedUser?.picture?.thumbnail} />
                                        </IonAvatar>
                                        <IonLabel class='ion-text-wrap'>
                                            {selectedUser?.name?.first} {selectedUser?.name?.last}
                                            <p>{selectedUser?.email}</p>
                                        </IonLabel>
                                    </IonItem>
                                </IonCardContent>
                            </IonCard>
                        )}
                        {activeSegment === 'calendar' && <IonDatetime />}
                    </IonContent>
                </IonModal>
            </IonContent>

            <IonModal ref={cardModal} trigger='card-modal' presentingElement={presentingElemant!} >
                <IonHeader>
                    <IonToolbar color={'success'}>
                        <IonButtons slot='start'>
                            <IonButton onClick={() => cardModal.current?.dismiss()}>Close</IonButton>
                        </IonButtons>
                        <IonTitle>Card Modal</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    SHEET
                </IonContent>
            </IonModal>

            <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                <IonFabButton id='card-modal' color={'tertiary'} >
                    <IonIcon icon={addOutline} />
                </IonFabButton>
            </IonFab>
        </IonPage>
    );
};

export default List;