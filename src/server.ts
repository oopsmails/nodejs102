import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import mongoose = require('mongoose'); //import mongoose

//routes
import { IndexRoute } from './route/index';

//interfaces
import { IUser } from './common/types/userType'; //import IUser

//models
import { IModel } from './model/model'; //import IModel
import { IUserModel } from './model/user'; //import IUserModel

//schemas
import { userSchema } from './mongo/schema/userSchema'; //import userSchema

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    private model: IModel; //an instance of IModel

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        //instance defaults
        this.model = Object(); //initialize this to an empty object

        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        const MONGODB_CONNECTION: string = 'mongodb://boy:test123@127.0.0.1:27017/tutorialtoy';

        //add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));

        //configure pug
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');

        //mount logger
        this.app.use(logger('dev'));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //mount cookie parker
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        //mount override
        this.app.use(methodOverride());

        //use q promises
        global.Promise = require('q').Promise;
        mongoose.Promise = global.Promise;

        //connect to mongoose
        const connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

        //create models
        this.model.user = connection.model<IUserModel>('User', userSchema);

        // catch 404 and forward to error handler
        this.app.use(() => (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Create and return Router.
     *
     * @class Server
     * @method config
     * @return void
     */
    private routes() {
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        //use router middleware
        this.app.use(router);
    }

}