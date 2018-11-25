## Requirements
This project requires **node** and **npm** to be installed


## Getting Started

In the project directory, you can run:
### `npm i`
install all dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## File Structure
    .
    ├── public                  # Served files (HTML, Fonts)
    ├── src                     # Source files (JS, and Stylesheets)
    │   ├── index.js            # Root of React application
    │   ├── index.css           # Stylesheet for application
    │   ├── components          # React.js UI Components 
    |   |  ├── Explorer         # Container Component responsible for all Apps high level state
    |   |  ├── ColumnSortController # Component responsible for most column sorting
    |   |  ├── ColumnFilterController # Component responsible for column filtering
    |   |  ├── ColumnStatistics # Component responsible for getting and showing column stats
    |   |  ├── Table            # Container Component responsible rending the CSV rows and columns
    |   |  ├── Welcome          # Static Landing page prompting user to drag and drop a CSV file
    |   |  └── ...              # all other components are children of the ones listed above
    │   |
    │   └── utils               # Helper Classes and Functions
    |      ├── Column           # Class for column info
    |      ├── Csv              # Class for CSV row and column info
    |      ├── Field            # Class for CSV row data (not used for column headers)
    |      ├── filterHelper     # helper functions for row filtering
    |      ├── sortHelper       # helper functions for row sorting
    |      └── statisticHelper  # helper functions for getting column statistics