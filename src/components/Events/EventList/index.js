import React from 'react'
import EventItem from './EventItem'
import './index.css'

const eventList = props =>{
    const events = props.events.map(evnt=>{
        return <EventItem 
        key={evnt._id} 
        price={evnt.price}
        date={evnt.date}
        eventId={evnt._id} 
        title={evnt.title} 
        userId={props.authUserId} 
        creatorId={evnt.creator._id}
        onDetail={props.onViewDetail}
        /> 
    });
    return(
    <ul className="event__list">
    {events}
</ul>
    )
};

export default eventList;