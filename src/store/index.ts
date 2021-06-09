import {createStore, useStore as baseUseStore, createLogger} from 'vuex' 
import {App, InjectionKey} from "vue";
import {store as asyncRoute, AsyncRouteStore, State as AsyncRouteState} from '@/store/modules/router';
import {store as user, UserStore, State as UserState} from '@/store/modules/user'; 
 import {store as tabsView, TabsViewStore, State as TabsViewState} from '@/store/modules/tab-view';

export type RootState = {
    asyncRoute: AsyncRouteState;
    user: UserState; 
    tabsView: TabsViewState;
};

export type Store =
    AsyncRouteStore<Pick<RootState, 'asyncRoute'>>
    & UserStore<Pick<RootState, 'user'>>
    & TabsViewStore<Pick<RootState, 'tabsView'>>   

const store = createStore<RootState>({
    // plugins,
    modules: {
        asyncRoute,
        user, 
         tabsView, 
    }
}) 
export function useStore(): Store { 
    return store as Store
}

export function setupStore(app: App) {
    app.use(store)
}

export default store
