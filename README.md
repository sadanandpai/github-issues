# Github Open Issues

Live link: https://sadanandpai.github.io/github-issues/build/

### Installation
- `git clone https://github.com/sadanandpai/github-issues.git`
- Navigate to the directory
- `npm install`
- `npm start`

### Technologies
- React
- Redux Toolkit
- React Router
- Bootstrap
- Styled Components

### Approach
- The pagination is shown with page number defaulted to 1 with total open issue count using API
- On every page request made the data is persisted in store
- On every next request to same page, the data is obtained from store and displayed
- On click of any issue, the data of markdown is converted to HTML and displayed (No API request is made)
- On click of back the issue page is displayed with the already present data

### Folder structure
- 2 pages for display of data are present in Pages folder - Issues, IssueDetails
- Components are placed in components folder - Pagination, RowInfo, Table
- Redux store actions and functions are place in store folder - issuesSlice, store
