import React from 'react'
import PropTypes from "prop-types";
import { UseStateValue } from '../../store/StateProvider'
import Api from '../../api/Api.ts'

function MovieCard(props) {
  const { Title, Poster, className, Type, ID, Year } = props;
  const [{ }, dispatch] = UseStateValue();

  const setDetail = (id) => {

    Api.getDetail((res) => {
      dispatch({
        type: "SET_DETAIL",
        detail: res.data,
        modalShow: true,
        modalHandleClose: false,
        modalHandleShow: true,
      });

    }, id)
  }
  return (
    <div className={`${className} p-2`}>
      <div className="card movieCard">
        <div className="img">
          <img className="card-img-top" src={Poster === 'N/A' ? 'none-img.png' : Poster} alt={Title} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{Title}</h5>
          <strong className="type mb-3">Type : {Type}</strong>
          <strong className="type mb-3">Year : {Year}</strong>
          <button className="btn btn-primary" onClick={e => setDetail(ID)}>More Info</button>
        </div>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  Title: PropTypes.string,
  Class: PropTypes.string,
  Poster: PropTypes.string,
  Type: PropTypes.string,
  ID: PropTypes.string,
}
MovieCard.defaultProps = {
  Title: "",
  Class: "col-lg-3",
  Poster: "",
  Type: "",
  ID: "",
}

export default MovieCard