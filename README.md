# Interview Scheduler
A single page web application that allows users to book interviews between Monday and Friday

# Final Product
 - Homepage
  !["Homepage"](https://github.com/Kimwj0318/scheduler/blob/master/public/docs/Loading%20Page.png)
 
 - Changing Day
  !["Changing-Day"](https://github.com/Kimwj0318/scheduler/blob/master/public/docs/Changing%20Day.png)

 - Adding Interview
  !["Adding-Interview"](https://github.com/Kimwj0318/scheduler/blob/master/public/docs/Adding%20an%20Interview.png)

 - Deleting Interview
  !["Deleting-Interview"](https://github.com/Kimwj0318/scheduler/blob/master/public/docs/Deleting%20Interview.png)

# Dependencies
  - axios
  - classnames
  - normalize.css
  - react
  - react-dom
  - react-scripts
  - babel
  - storybook
  - node-sass
  - prop-types
  - react-test-renderer
  - Jest
  - Webpack Dev Server

# Description
  - A single page web app used to book interviews throughout the week

  - The selected day on load is Monday

  - Users can change the selected day by clicking on the days that are available on the left side of the app
    - Each day displays how many interview spots are remaining for the day

  - Users can create new interviews and edit or delete existing interviews
    - Creating and deleting interviews change the number of spots remaining whereas editing does not

  - Users have to choose an interviewer and the name of the student to save the interview

  - If deleting, editing, or saving the interview runs into an error, the proper error alert is displayed