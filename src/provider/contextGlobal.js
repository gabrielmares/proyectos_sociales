import { createContext, useState } from 'react';
import events from '../components/events'

export const sessionContext = createContext();

const GlobalContext = (props) => {

    const [sidebar, setSidebar] = useState(true)
    const [myEventsList, setMyEventsList] = useState(events)
    return (
        <sessionContext.Provider
            value={{
                sidebar,
                myEventsList,
                setSidebar,
                setMyEventsList
            }}
        >
            {props.children}
        </sessionContext.Provider>
    );
}

export default GlobalContext;