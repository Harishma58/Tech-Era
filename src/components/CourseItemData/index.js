import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class CourseItemData extends Component {
  state = {
    courseData: {},
    isLoading: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursedata()
  }
  getCoursedata = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(` https://apis.ccbp.in/te/courses/${id}`)
    const data = await response.json()
    if (response.ok) {
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        courseImage: data.course_details.image_url,
        description: data.course_details.description,
      }

      this.setState({
        courseData: formattedData,
        isLoading: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        isLoading: false,
      })
    }
  }
  renderCourseData = () => {
    const {courseData} = this.state
    const {id, name, courseImage, description} = courseData
    return (
      <>
        <Header />
        <div className="image-container">
          <img src={courseImage} alt={name} className="course-image" />
          <div>
            <h1 className="course-name">{name}</h1>
            <p className="course-description">{description}</p>
          </div>
        </div>
      </>
    )
  }
  onRetry = () => {
    return this.getCoursedata()
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
  results = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }
  render() {
    return <div>{this.results()}</div>
  }
}
export default CourseItemData
