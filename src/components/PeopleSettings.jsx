import React from 'react';

const PeopleSettings = ({creds, chat}) => {
    // console.log('hi');
    // console.log(chat);
    const people = chat.people;
    
    return (
        <div className='ce-people-section'>
            <div className='ce-section-title-container'>
                <div className='ce-section-title'>
                    People
                </div>
            </div>
            <div style={{height: '12px'}} />
            <div className='ce-people-list'>
                {people.map((person, index) => {
                    const personNameInfo = person.person.username.split('_');
                    const color = personNameInfo[1];
                    return (
                        <div className='ce-person-container' key={index}>
                            <div 
                                className='ce-person-avatar'
                                style={{backgroundColor: color}}>
                                
                                <div className='ce-person-avatar-text'>
                                    {`${personNameInfo[0][0]}${personNameInfo[1][0]}${personNameInfo[2][0]}`}
                                </div>
                            </div>
                            <div className='ce-person-text'>
                                {person.person.username}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default PeopleSettings;