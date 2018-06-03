require('./app_config');
require('./app_routes');
require('./app_run');
require('./app');

// Styles!
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'angular-xeditable/dist/css/xeditable.css'
import 'ng-tags-input/build/ng-tags-input.css'
import 'animate.css/animate.css'
import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'
import 'angularjs-toaster/toaster.css'

// Our own styles <3
import '../style/css/main.css'
import '../style/css/ice.css'
import '../style/css/checkbox.css'
import '../style/css/shorties.css'

// Application
require('./api/api_service');
require('./modals/modals_service');
require('./basement');
require('./account');
require('./actions');
require('./site');
require('./comment');
require('./entry');
require('./tag');
require('./team');
require('./dolphin');
require('./start');
require('./header');
require('./main');
require('./navigation');
