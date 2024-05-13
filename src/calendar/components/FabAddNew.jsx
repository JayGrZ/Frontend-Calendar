import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"
import { useSelector } from "react-redux"


export const FabAddNew = () => {

    const { openDateModal } = useUiStore()
    const { setActiveEvent } = useCalendarStore()
    // const { user } = useSelector( state => state.auth )

    const handleClickNew = () => {
        setActiveEvent({
            // _id: new Date().getTime(),
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Jairo'
            }
        })
        
        openDateModal()
    }

  return (
    <button
        className="btn btn-primary fab"
        onClick={ handleClickNew }
    >
        <i className="fas fa-plus"></i>
    </button>
  )
}
