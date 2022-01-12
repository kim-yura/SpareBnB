import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { loadUpdateSpot, loadSpotDetail, deleteSpot } from '../../store/spotReducer';


import './SpotDetail.css';

function SpotDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => {
        return state.spot
    });

    useEffect(() => {
        dispatch(loadSpotDetail(spotId))
    }, [dispatch, spotId]);

    const spotObj = Object.values(spot)[0];

    // TO-DO: REFACTOR
    if (spotObj) {
        if (sessionUser && (sessionUser.id === spotObj.User.id)) {
            return (
                <>
                    <div className="site-background">
                        <div className="detail-container">
                            <img className="detail-image" src={spotObj.Images[0] ? spotObj.Images[0].url : "https://res.cloudinary.com/dy2azwmd6/image/upload/v1641929219/spot-image-default_a7w3nx.png"} alt="Depiction of spare room available" />
                            <div className="detail-text">
                                <h1>{spotObj.name}</h1>
                                <h3 className="detail-map"><a href={`https://www.google.com/maps/place/${spotObj.city}+${spotObj.state}+${spotObj.country}`} target="_blank">
                                    {spotObj.city}, {spotObj.state}, {spotObj.country}
                                </a></h3>
                                <p className="detail-long-text">
                                    {spotObj.description}
                                </p>
                            </div>
                        </div>

                        <div className="edit-delete-buttons">
                            <a href={`/spots/${spotObj.id}/edit`}>
                                Edit
                            </a>
                            <a
                                onClick={(e) => {
                                    dispatch(deleteSpot(spotObj.id))
                                    history.push("/")
                                }}>
                                Delete
                            </a>
                        </div>

                        <h2 className="reviews-header">Reviews</h2>
                        <div className="detail-reviews">
                            <div className="detail-review">
                                <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].id : ""}</p>
                                <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].review : ""}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="site-background">
                        <div className="detail-container">
                            <img className="detail-image" src={spotObj.Images[0] ? spotObj.Images[0].url : "https://res.cloudinary.com/dy2azwmd6/image/upload/v1641929219/spot-image-default_a7w3nx.png"} alt="Depiction of spare room available" />
                            <div className="detail-text">
                                <h1>{spotObj.name}</h1>
                                <h3 className="detail-map"><a href={`https://www.google.com/maps/place/${spotObj.city}+${spotObj.state}+${spotObj.country}`} target="_blank">
                                    {spotObj.city}, {spotObj.state}, {spotObj.country}
                                </a></h3>
                                <p className="detail-long-text">
                                    {spotObj.description}
                                </p>
                            </div>
                        </div>

                        <h2 className="reviews-header">Reviews</h2>
                        <div className="detail-reviews">
                            <div className="detail-review">
                                <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].id : ""}</p>
                                <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].review : ""}</p>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <></>
        )
    };

};

export default SpotDetail;
