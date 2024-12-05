import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import CourseItem from '../CourseItem'

import './index.css'
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {courses: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourses()
  }
  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courses: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }
  renderCourseDetails = () => {
    const {courses} = this.state
    return (
      <ul className="list-container">
        {courses.map(each => (
          <CourseItem key={each.id} coursesDetails={each} />
        ))}
      </ul>
    )
  }
  onRetry = () => {
    return this.getCourses()
  }
  renderFailureView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )
  loaderView = () => (
    <div className="failure-cont" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )
  renderGetResults = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
  render() {
    return (
      <div className="bg-container"  >
        <Header />
        <h1 className="heading">Courses</h1>
        {this.renderGetResults()}
      </div>
    )
  }
}

export default Home
