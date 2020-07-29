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
                            key={track.id}
                            track={track}
                            onAdd={this.props.onAdd} 
                            onRemove={this.props.onRemove} 
                            isRemoval={this.props.isRemoval}></Track>;
                    })
                }
            </div>            
        );
    }
}

export default TrackList;