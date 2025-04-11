import React from 'react';
import { Event } from '../../types';

interface UpcomingEventsProps {
    events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden border-l-4" style={{ borderLeftColor: event.color }}>
                    <div className="p-5">
                        <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-2">
                            {event.date} • {event.time}
                        </p>
                        <p className="mb-2">
                            {event.animals} • {event.volunteers}
                        </p>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            event.type === 'Evento'
                                ? 'bg-blue-100 text-blue-800'
                                : event.type === 'Capacitación'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                        }`}>
              {event.type}
            </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UpcomingEvents;