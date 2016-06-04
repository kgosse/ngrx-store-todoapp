import './assets/styles/todomvc.css';

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {App} from './components/app';
import {provideStore} from '@ngrx/store';
import { runEffects } from '@ngrx/effects';

import {todos} from "./reducers/todos";
import effects from './effects';

//noinspection TypeScriptValidateTypes
bootstrap(App, [
    provideStore({todos}),
    // runEffects(effects)
]);
