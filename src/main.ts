import './assets/styles/todomvc.css';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {App} from './components/app';
import {provideStore} from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import effects from './effects';
import {filters} from "./reducers/filters";
import {todos} from "./reducers/todos";

//noinspection TypeScriptValidateTypes
bootstrap(App, [
    provideStore({todos, filters}),
    runEffects(effects)
]);
