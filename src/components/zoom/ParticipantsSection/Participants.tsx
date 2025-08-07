import React from "react";
import "../RoomPage.css";

const SingleParticipant = (props: any) => {
    const { identity, lastItem, participant } = props;

    return (
        <>
            <p className="participants_paragraph">{identity}</p>
            {!lastItem && <span className="participants_separator_line"></span>}
        </>
    );
};

const Participants = ({ participants }: any) => {
    return (
        <div className="participants_container">
            {participants.map((participant: any, index: any) => {
                return (
                    <SingleParticipant
                        key={participant.identity}
                        lastItem={participants.length === index + 1}
                        participant={participant}
                        identity={participant.identity}
                    />
                );
            })}
        </div>
    );
};



export default Participants;
