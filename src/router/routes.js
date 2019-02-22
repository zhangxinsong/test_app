import firstPage from 'Components/firstPage/firstPage.vue';
import my from 'Components/my/my.vue';
import myEdit from 'Components/my/myEdit.vue';
import login from 'Components/login/login.vue';
import signin from 'Components/signin/signin.vue';
import forget from 'Components/forget/forget.vue';
import rank from 'Components/rank/rank.vue';
import test from 'Components/test/index.vue';
import start from 'Components/test/start.vue';
import speed from 'Components/test/speed.vue';
import score from 'Components/test/score.vue';
import end from 'Components/test/end.vue';

export default[{
    path: '',
    component: firstPage,
    redirect: '/firstPage'
},{
    path: '/login',
    name: 'login',
    component: login
},{
    path: '/signin',
    component: signin
},{
    path: '/forget',
    component: forget
},{
    path: '/firstPage',
    component: firstPage
},{
    path: '/my',
    component: my
},{
    path: '/myEdit',
    component: myEdit
},{
    path: '/rank',
    component: rank
},{
    path: '/test',
    component: test,
    children: [{
        path: '',
        component: start
    },{
        path: 'start',
        component: start
    },{
        path: 'speed',
        component: speed
    },{
        path: 'score',
        component: score
    },{
        path: 'end',
        component: end
    }]
}]