export const initialState = {
  movies: [],
  pages: [],
  title: 'movies',
  year: '',
  plot: '',
  listType: '',
  detail: [],
  modalShow: false,
  modalHandleClose: false,
  modalHandleShow: true,
};

const reducer = (state, action) => {
  switch (action.type) {

    case "SET_MOVIES":
      return {
        ...state,
        movies: action.movies,
        pages: action.pages,
        title: action.title,
        year: action.year,
        listType: action.listType,
      };

    case "SET_DETAIL":
      return {
        ...state,
        detail: action.detail,
        modalShow: action.modalShow,
        modalHandleClose: action.modalHandleClose,
        modalHandleShow: action.modalHandleShow,
      };

    case "MODAL_STATUS":
      return {
        ...state,
        modalShow: action.modalShow,
      };

    default:
      return state;

  }
};

export default reducer;
