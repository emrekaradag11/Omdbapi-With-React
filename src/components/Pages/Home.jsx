import React, { useEffect, useState } from 'react'
import Api from '../../api/Api'
import { UseStateValue } from './../../store/StateProvider'
import MovieCard from './../Utils/MovieCard'
import Modal from 'react-bootstrap/Modal';

function Home() {
  const [{ movies, pages, title, year, modalShow, detail, plot, listType }, dispatch] = UseStateValue();
  const [loader, setLoader] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  const pageDelimiter = 10;
  const totalPage = Math.ceil(pages / pageDelimiter);
  const yearList = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    yearList.push(i)
  }


  const fetchData = (fetchTitle = title, fetchPageNumber = pageNumber, fetchYear = year, fetchPlot = plot, fetchListType = listType) => {
    setLoader(1)
    Api.getMovies((res) => {
      dispatch({
        type: "SET_MOVIES",
        movies: res.data.Search,
        pages: res.data.totalResults,
        title: fetchTitle,
        year: fetchYear,
        plot: fetchPlot,
        listType: fetchListType,
      });
      setLoader(0)
    }, fetchTitle, fetchPageNumber, fetchYear, fetchPlot, fetchListType)
  }

  const setTitle = (val) => fetchData(val)
  const setPage = (val) => {
    fetchData(title, val)
    setpageNumber(val)
  }
  const setYear = (val) => fetchData(title, pageNumber, val)
  const setPlot = (val) => fetchData(title, pageNumber, year, val)
  const setType = (val) => fetchData(title, pageNumber, year, plot, val)
  const modalCloser = (val) => {
    dispatch({
      type: "MODAL_STATUS",
      modalShow: false
    });
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div>
      <div className={(loader === 0 ? 'd-none' : null) + " loader"}></div>
      <div className="col-lg-11 mx-auto my-5 py-5 text-startw">
        <div className="row filterContent mb-5">
          <div className="col-lg">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} id="title" />
            </div>
          </div>
          {/* <div className="col-lg">
            <div className="mb-3">
              <label htmlFor="i" className="form-label">IMDB ID</label>
              <input type="text" className="form-control" placeholder="Type Here" id="i" />
            </div>
          </div> */}
          <div className="col-lg">
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year</label>
              <select onChange={(e) => setYear(e.target.value)} className="form-select" id="year">
                <option value="">All</option>
                {yearList.reverse().map((x, y) => {
                  return <option key={y} value={x}>{x}</option>
                })}
              </select>
            </div>
          </div>
          <div className="col-lg">
            <div className="mb-3">
              <label htmlFor="plot" className="form-label">Plot</label>
              <select id="plot" onChange={(e) => setPlot(e.target.value)} className="form-select">
                <option value="">All</option>
                <option value="short">Short</option>
                <option value="full">Full</option>
              </select>
            </div>
          </div>
          <div className="col-lg">
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select id="type" onChange={(e) => setType(e.target.value)} className="form-select">
                <option value="">All</option>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row px-2">
          {movies?.map((x, y) => {
            return <MovieCard
              className='col-55'
              Poster={x.Poster}
              Title={x.Title}
              key={y}
              Type={x.Type}
              Year={x.Year}
              ID={x.imdbID}
            />
          })}
        </div>
        {
          totalPage > 1 ? (
            <div className="row justify-content-center text-center mt-5">
              <nav aria-label="Page navigation col-auto">
                <ul className="pagination justify-content-center flex-wrap">
                  {
                    pageNumber > 1 ? (
                      <li className="page-item"><button className="page-link" onClick={(e) => setPage(pageNumber - 1)}>Previous</button></li>
                    ) : null
                  }
                  
                  {
                    totalPage > 0 ? Array.from(Array(totalPage), (e, i) => {
                      return <li key={i} className={(pageNumber === i + 1 ? 'active' : null) + " page-item"}><button onClick={(e) => setPage(i + 1)} className="page-link">{i + 1}</button></li>;
                    }) : null
                  }
                  {
                    pageNumber < totalPage ? (
                      <li className="page-item"><button className="page-link" onClick={(e) => setPage(pageNumber + 1)}>Next</button></li>
                    ) : null 
                  }
                  
                </ul>
              </nav>
            </div>
          ) : null
        }
      </div>



      <Modal show={modalShow} className="modal-xl mt-0">
        <Modal.Header>
          <Modal.Title>{detail?.Title}</Modal.Title>
          <button type="button" className="btn-close" onClick={e => modalCloser()}></button>
        </Modal.Header>
        <Modal.Body>
          <div className="movieDetail">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={detail?.Poster} className="w-100 img-fluid rounded-start" alt={detail?.Title} />
                </div>
                <div className="col-md">
                  <div className="card-body">
                    <p className="card-text">{detail?.Plot}</p>
                    <div className="row">
                      <div className="col-lg-6">
                        <ul>
                          <li><small className="text-muted"><b>Year :</b> {detail?.Year}</small></li>
                          <li><small className="text-muted"><b>Type :</b> {detail?.Type}</small></li>
                          <li><small className="text-muted"><b>Genre :</b> {detail?.Genre}</small></li>
                          <li><small className="text-muted"><b>Actors :</b> {detail?.Actors}</small></li>
                          <li><small className="text-muted"><b>Country :</b> {detail?.Country}</small></li>
                          <li><small className="text-muted"><b>Awards :</b> {detail?.Awards}</small></li>
                          <li><small className="text-muted"><b>Director :</b> {detail?.Director}</small></li>
                          <li><small className="text-muted"><b>Language :</b> {detail?.Language}</small></li>
                          <li><small className="text-muted"><b>Released :</b> {detail?.Released}</small></li>
                          <li><small className="text-muted"><b>Runtime :</b> {detail?.Runtime}</small></li>
                          <li><small className="text-muted"><b>IMDB :</b> {detail?.imdbRating}</small></li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <h5 className="card-title">Ratings</h5>
                        <ul>
                          {detail?.Ratings?.map(x => {
                            return (<li><small className="text-muted"><b>{x.Source} :</b> {x.Value}</small></li>)
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {console.log(detail)}
      </Modal>


    </div>
  )
}

export default Home