import './assets/styles/todomvc.css';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {App} from './components/app';
import {provideStore} from '@ngrx/store';
import {todos} from "./reducers/todos";

//noinspection TypeScriptValidateTypes
bootstrap(App, [
    provideStore({todos})
]);
