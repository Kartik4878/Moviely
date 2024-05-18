import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import APIHandler from "../ApiConnections/APIHandler";
import AddToBasket from "./AddToBasket";
import configs from ".././configs.json"
import RenderFormSkin from "../Common/RenderFormSkin";
function MovieDetails(props) {
    const [MovieDetails, ManageDetails] = useState();
    const [dataLoaded, ManageLoading] = useState();
    const style = {
        width: "80rem"
    }
    const imageStyle = {
        height: "500px",
        width: "350px"
    }

    const { onCartAdd, cartItems } = props;

    let { id } = useParams();
    useEffect(() => {
        ManageLoading(true);
        async function getMovieDetails() {
            ManageLoading(false);
            const { data } = await APIHandler.get(configs.MovieDetails + id);
            ManageDetails(data);
            ManageLoading(true);
        }
        getMovieDetails();
    }, [id])

    function renderMovieDetails() {
        return <>{MovieDetails && <div className="row justify-content-center m-3">
            <div className="col-4 card" style={style}>
                <div className="row justify-content-center m-2">
                    <img style={imageStyle} className="card-img-top" src={MovieDetails.Img_link} alt={MovieDetails.Name} />
                    <div className="card-body">
                        <p className="font-weight-light">Year : {MovieDetails.Year}</p>
                        <p className="font-weight-light">Rating : {MovieDetails.Imdb_rating}</p>
                        <p className="font-italic">Genre : {MovieDetails.Genre}</p>
                        <p className="font-weight-light">Cast : {MovieDetails.Cast_name}</p>
                        <Link to="/"><button className="btn btn-primary">Back</button></Link>
                        <AddToBasket item={MovieDetails} onCartAdd={onCartAdd} cartItems={cartItems} />
                    </div>
                </div>

            </div>

        </div>}

        </>
    }

    return (
        <>
            {<RenderFormSkin formData={renderMovieDetails()} formTitle={MovieDetails && MovieDetails?.Name} isLoaded={dataLoaded} />}
        </>
    )
}
export default MovieDetails;