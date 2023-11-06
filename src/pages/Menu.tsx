import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';
import { listSharp, logOut, logOutOutline, newspaperOutline } from 'ionicons/icons';

const Menu: React.FC = () => {

    const paths = [
        { name: 'List', url: '/menu/list', icon: listSharp },
        { name: 'Settings', url: '/menu/settings', icon: newspaperOutline },
    ]

    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu contentId='main'>
                    <IonHeader>
                        <IonToolbar color={'primary'}>
                            <IonButtons slot='start'>
                                <IonMenuToggle>
                                    <IonBackButton text="Close" defaultHref='#' />
                                </IonMenuToggle>
                            </IonButtons>
                            <IonTitle className='ion-text-center' size='large'>Menu</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {paths.map((item, index) => (
                            <IonMenuToggle key={index} autoHide={false} >
                                <IonItem detail={true} routerLink={item.url} routerDirection='none'>
                                    <IonIcon slot='start' icon={item.icon} />
                                    {item.name}</IonItem>
                            </IonMenuToggle>
                        ))}
                        <IonMenuToggle autoHide={false} >
                            <IonItem detail={true} routerLink='/' routerDirection='root'>
                                <IonIcon color='danger' slot='start' icon={logOutOutline} />Logout</IonItem>
                        </IonMenuToggle>
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main' >
                    <Route exact path='/menu/list' component={List} />
                    <Route path='/menu/settings' component={Settings} />
                    <Route exact path='/menu'>
                        <Redirect to='/menu/list' />
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Menu;

