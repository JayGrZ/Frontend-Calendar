import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDoEvents } from "../helpers";



export const useCalendarStore = () => {
  
    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );
  
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //Todo: Update event
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({...calendarEvent}) );
        } else {
            // Creando
            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) )
        }
    }

    const startDeletingEvent = () => {
        //TODO: Llegar al backend

        
        dispatch(onDeleteEvent())
    }


    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events');
            const events = convertEventsToDoEvents(data.eventos)
            console.log({data})

        } catch (error) {
            console.log('error cargando eventos');
            console.log(error)
        }
    }


    return {
        //* Props
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
    
}
