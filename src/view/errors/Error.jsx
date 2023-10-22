import { observer } from 'mobx-react-lite';
import { useStore } from '../../controller/store';

import classNames from 'classnames';
import classes from './Error.module.scss';


const Error = () => {

    const {store} = useStore();

    return (
        <div className={store.isErrorActive ? classNames(classes.error, classes.active) : classes.error }>
            <div className={classes.error__text}>
                Ошибка {store.errorCode}: {store.error}
            </div>
            <div className={classes.error__btn} onClick={() => store.closeError()}>
                ОК
            </div>
        </div>
    );
}

export default observer(Error);
