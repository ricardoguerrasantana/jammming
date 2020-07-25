import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map((track) => {
                        return <Track 
                            id={track.id} 
                            track={track}
                            onAdd={this.props.onAdd}
                            isRemoval={this.props.isRemoval}></Track>;
                    })
                }
            </div>            
        );
    }
}

export default TrackList;