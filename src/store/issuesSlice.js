import { createSlice } from '@reduxjs/toolkit';

const perPageResultCount = 10;

export const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    activePageNumber: 1,
    count: 0,
    totalPages: 0,
    dataStore: {},
    currentPageData: [],
  },
  reducers: {
    setActivePageNumber: (state, { payload }) => {
      state.activePageNumber = payload;
    },
    setIssuesCount: (state, { payload }) => {
      state.count = payload;
    },
    setTotalPages: (state, { payload }) => {
      state.totalPages = payload;
    },
    setDataStore: (state, { payload }) => {
      state.dataStore[payload.pageNumber] = payload.data;
    },
    setDataToDisplay: (state, { payload }) => {
      state.currentPageData = state.dataStore[payload];
    },
  },
});

const setDataToDisplayAsync = (pageNumber) => async (dispatch, getState) => {
  const state = getState();
  if (state.issues.dataStore?.[pageNumber]) {
    dispatch(setDataToDisplay(pageNumber));
  } else {
    const data = await getIssuesByPage(pageNumber);
    dispatch(setDataStore({ pageNumber, data: data }));
  }
};

const getTotalPagesAsync = () => async (dispatch) => {
  const totalIssues = await getIssuesCount();
  dispatch(setIssuesCount(totalIssues));
  dispatch(setTotalPages(Math.ceil(totalIssues / perPageResultCount)));
};

async function getIssuesCount() {
  const response = await fetch('https://api.github.com/repos/facebook/create-react-app');
  const data = await response.json();
  return data.open_issues_count;
  // return 950;
}

async function getIssuesByPage(pageNumber) {
  const response = await fetch(
    `https://api.github.com/repos/facebook/create-react-app/issues?state=open&per_page=${perPageResultCount}&page=${pageNumber}`,
  );
  const data = await response.json();
  return data;
}

export default issuesSlice.reducer;
export const { setActivePageNumber, setIssuesCount, setTotalPages, setDataStore, setDataToDisplay } = issuesSlice.actions;
export { setDataToDisplayAsync, getTotalPagesAsync };
export const selectLayout = (state) => state.value;
