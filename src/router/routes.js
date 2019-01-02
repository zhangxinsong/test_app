import firstPage from 'Components/firstPage/firstPage.vue';
import my from 'Components/my/my.vue';

export default[{
    path: '',
    component: firstPage,
    redirect: '/firstPage'
},{
    path: '/firstPage',
    component: firstPage
},{
    path: '/conferenceMy',
    component: my
}]