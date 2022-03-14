import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';

import { loadUpdateSpot, loadSpotDetail, deleteSpot } from '../../store/spotReducer';
import ConfirmDelete from '../SpotDeleteConfirmationModal/ConfirmDelete';
import PageNotFound from '../PageNotFound';

import './SpotDetail.css';

function SpotDetail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

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
                    <div className="site-body">
                        <div className='site-gradient' />
                        <div className="site-background">
                            <div className="detail-container">
                                <img className="detail-image" src={spotObj.imageUrl} alt="Depiction of spare room available" />
                                <div className="detail-text">
                                    <h1>{spotObj.name}</h1>
                                    <h3 className="detail-map"><a href={`https://www.google.com/maps/place/${spotObj.city}+${spotObj.state}+${spotObj.country}`} target="_blank">
                                        {spotObj.city}, {spotObj.state}, {spotObj.country}
                                    </a></h3>
                                    <h4 className='detail-host'>Hosted by <a href={`/users/${spotObj.User.id}`}>{spotObj.User.username}</a></h4>
                                    <p className="detail-long-text">
                                        {spotObj.description}
                                    </p>
                                </div>
                            </div>

                            <div className="edit-delete-buttons">
                                <Link to={`/spots/${spotObj.id}/edit`}>
                                    Edit
                                </Link>
                                <a
                                    onClick={(e) => {
                                        setShowModal(true)
                                        // dispatch(deleteSpot(spotObj.id))
                                        // history.push("/")
                                    }}>
                                    Delete
                                </a>
                                {showModal && (
                                    <Modal onClose={() => setShowModal(false)}>
                                        <ConfirmDelete />
                                    </Modal>
                                )}
                            </div>

                            <h2 className="reviews-header">Reviews</h2>
                            <div className="detail-reviews">
                                <div className="detail-review">
                                    <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].id : ""}</p>
                                    <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].review : ""}</p>
                                </div>
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
                            <img className="detail-image" src={spotObj.imageUrl} alt="Depiction of spare room available" />
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

                        {/* <h2 className="reviews-header">Reviews</h2>
                        <div className="detail-reviews">
                            <div className="detail-review">
                                <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].id : ""}</p>
                                <p>{spotObj.Reviews[0] ? spotObj.Reviews[0].review : ""}</p>
                            </div>
                        </div> */}
                    </div>
                </>
            )
        }
    } else {
        return (
            <PageNotFound />
        )
    };

};

export default SpotDetail;
